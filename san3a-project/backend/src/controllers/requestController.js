const Request = require('../models/requestModel');
const User = require('../models/userModel');

exports.findNearbyCraftsmen = async (req, res) => {
    try {
        const request = await Request.findById(req.params.requestId);

        if (!request) {
            return res.status(404).json({
                status: 'fail',
                message: 'الطلب غير موجود',
            });
        }

        const [longitude, latitude] = request.location.coordinates;

        const craftsmen = await User.find({
            role: 'craftsman',
            isAvailable: true,
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        }).select('name phone avatar location isAvailable');

        res.status(200).json({
            status: 'success',
            results: craftsmen.length,
            data: {
                craftsmen,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'تعذر البحث عن فنيين قريبين',
            error: err.message,
        });
    }
};

exports.createRequest = async (req, res) => {
    try {
        const {
            service,
            address,
            coordinates,
            clientNotes,
            paymentMethod,
            scheduledAt,
        } = req.body;

        const baseFee = 120;
        const emergencyFee = !scheduledAt || new Date(scheduledAt) <= new Date() ? 30 : 0;
        const totalAmount = baseFee + emergencyFee;

        const newRequest = await Request.create({
            client: req.user._id,
            service,
            location: {
                address,
                coordinates,
            },
            clientNotes,
            scheduledAt: scheduledAt || Date.now(),
            pricing: {
                baseFee,
                emergencyFee,
                totalAmount,
            },
            paymentMethod,
        });

        res.status(201).json({
            status: 'success',
            data: {
                request: newRequest,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'فشل في إنشاء الطلب، يرجى مراجعة البيانات',
            error: err.message,
        });
    }
};

exports.getRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                status: 'fail',
                message: 'الطلب غير موجود',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                request,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'تعذر جلب الطلب',
            error: err.message,
        });
    }
};


// 4. قبول الطلب من طرف الحرفي (Accept Request)
exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    // 1. التأكد إن اللي بيطلبالمسار ده هو فني (Craftsman) فعلاً
    // (الـ protect middleware بيكون حاطط بيانات الفني في req.user)
    if (req.user.role !== 'craftsman') {
      return res.status(403).json({
        status: 'fail',
        message: 'غير مسموح لك بقبول هذا الطلب، هذا الإجراء مخصص للفنيين فقط'
      });
    }

    // 2. البحث عن الطلب والتأكد إنه لسه منتظر فني ومحدش خطفه قبله!
    const currentRequest = await Request.findById(requestId);
    
    if (!currentRequest) {
      return res.status(404).json({ status: 'fail', message: 'الطلب غير موجود' });
    }

    if (currentRequest.status !== 'PENDING_MATCHING') {
      return res.status(400).json({
        status: 'fail',
        message: 'عذراً، هذا الطلب لم يعد متاحاً (تم قبوله من فني آخر أو تم إلغاؤه)'
      });
    }

    // 3. تحديث بيانات الطلب: ربطه بالفني وتغيير الحالة
    currentRequest.craftsman = req.user._id;
    currentRequest.status = 'ACCEPTED';
    
    // تسجيل تغيير الحالة في تاريخ الطلب (لو عامل فيلد للـ history)
    currentRequest.statusHistory.push({
      status: 'ACCEPTED',
      changedAt: Date.now()
    });

    await currentRequest.save();

    // 4. تغيير حالة الفني لـ "مشغول" في جدول الـ Users
    await User.findByIdAndUpdate(req.user._id, { isAvailable: false });

    res.status(200).json({
      status: 'success',
      message: 'تم قبول الطلب بنجاح، بالتوفيق في عملك!',
      data: {
        request: currentRequest
      }
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'حدث خطأ أثناء قبول الطلب',
      error: err.message
    });
  }
};


// تحديث حالة الطلب (من قِبل الفني)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // الحالة الجديدة اللي جاية من الفرونت (مثلا: IN_PROGRESS)

    // التأكد إن اللي بيعدل هو الفني وصاحب الطلب ده بالذات
    const currentRequest = await Request.findById(requestId);
    if (!currentRequest) {
      return res.status(404).json({ status: 'fail', message: 'الطلب غير موجود' });
    }

    if (currentRequest.craftsman.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'fail', message: 'غير مسموح لك بتعديل هذا الطلب' });
    }

    // تحديث الحالة وحفظ التاريخ
    currentRequest.status = status;
    currentRequest.statusHistory.push({
      status,
      changedAt: Date.now()
    });

    await currentRequest.save();

    res.status(200).json({
      status: 'success',
      message: `تم تحديث حالة الطلب إلى ${status}`,
      data: { request: currentRequest }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
// إنهاء الطلب بنجاح
exports.completeRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const currentRequest = await Request.findById(requestId);
    if (!currentRequest) {
      return res.status(404).json({ status: 'fail', message: 'الطلب غير موجود' });
    }

    // التأكد إن الفني المربوط بالطلب هو اللي بيقفل
    if (currentRequest.craftsman.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'fail', message: 'عذراً، أنت لست الفني المسؤول عن هذا الطلب' });
    }

    // 1. تحديث حالة الطلب لـ COMPLETED
    currentRequest.status = 'COMPLETED';
    currentRequest.statusHistory.push({
      status: 'COMPLETED',
      changedAt: Date.now()
    });
    await currentRequest.save();

    // 2. تحرير الفني ليكون متاحاً لطلبات أخرى فوراً ✨
    await User.findByIdAndUpdate(req.user._id, { isAvailable: true });

    res.status(200).json({
      status: 'success',
      message: 'تم إنهاء الطلب بنجاح، وتحويل حالتك إلى متاح لتلقي طلبات جديدة!',
      data: { request: currentRequest }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};