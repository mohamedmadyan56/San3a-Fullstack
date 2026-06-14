const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  client: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'الطلب يجب أن ينتمي لعميل'] 
  },
  craftsman: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null // بيبدأ null لحد ما فني يوافق على الأوردر
  },
  service: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: [true, 'الطلب يجب أن يحدد نوع الخدمة الأساسية'] 
  },
  
  status: {
    type: String,
    enum: ['PENDING_MATCHING', 'ACCEPTED', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING_MATCHING' // الحالة المبدئية: جاري البحث عن فني
  },
  statusHistory:[{
    status:{type:String},
    changeAt:{type:Date,default:Date.now},
    note:{type:String}
  }],
  arriveAt:{type:Date},
    startedAt: { type: Date },
  completedAt: { type: Date },

  
  location: {
    address: { 
      type: String, 
      required: [true, 'يجب إدخال العنوان النصي بالتفصيل'] 
    },
    coordinates: {
      type: [Number], // [longitude, latitude] مهم الترتيب ده للـ GeoJSON في المونجو
      required: [true, 'يجب تحديد الموقع الجغرافي على الخريطة']
    }
  },
  
  scheduledAt: { 
    type: Date, 
    default: Date.now // لو العميل اختار "الآن"، بينزل بوقت اللحظة الحالية
  }, 
  
  clientNotes: { 
    type: String // ملاحظات العميل (مثل: تسريب مياه تحت الحوض)
  },
  
  pricing: {
    baseFee: { type: Number, required: true, default: 0 },      // السعر الأساسي للمعاينة أو الخدمة
    emergencyFee: { type: Number, default: 0 },   // رسوم الطوارئ (مثلاً 30 جنيه لو الطلب "الآن")
    totalAmount: { type: Number, required: true, default: 0 }    // الإجمالي اللي بيظهر للفني
  },
  
  paymentMethod: {
    type: String,
    enum: ['CASH', 'CARD', 'VODAFONE_CASH'],
    default: 'CASH'
  },
  
  isPaid: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

// عمل Index جغرافي للإحداثيات عشان نقدر نعمل Queries ونطلع أقرب فنيين للطلب بسهولة
requestSchema.index({ "location.coordinates": "2dsphere" });
module.exports = mongoose.model('Request', requestSchema);