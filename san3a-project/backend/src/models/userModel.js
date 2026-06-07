const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'من فضلك ادخل الاسم بالكامل']
    },
    email:{
        type: String,
        required: [true, 'من فضلك أدخل البريد الإلكتروني'],
        unique: true,
        lowercase: true, // تم تصحيح الاسم هنا
        validate:[validator.isEmail,'please provide a valid email']
    },
    phone:{
        type: String,
        required: [true, 'من فضلك أدخل رقم الهاتف'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'من فضلك ادخل كلمه المرور'],
        minlength: 8,
        select: false
    },
  
    role: {
        type: String,
        enum: ['customer', 'artisan', 'admin'],
        default: 'customer'
    },
    avatar:{
        type: String,
        default: 'default.png'
    },  passwordChangedAt: Date,
    isActive:{
        type: Boolean,
        default: true,
        select: false
    }
},{
    timestamps: true
});

// Middleware لتشفير كلمة المرور قبل الحفظ
userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfrim=undefined;
    
});

// دالة التحقق من صحة كلمة المرور
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;