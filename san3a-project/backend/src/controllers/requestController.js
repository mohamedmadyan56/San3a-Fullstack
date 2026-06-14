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