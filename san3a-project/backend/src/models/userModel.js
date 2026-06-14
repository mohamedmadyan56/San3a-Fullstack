const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'من فضلك ادخل الاسم بالكامل']
    },
    email: {
        type: String,
        required: [true, 'من فضلك أدخل البريد الإلكتروني'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'من فضلك أدخل رقم الهاتف'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'من فضلك ادخل كلمه المرور'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['customer', 'craftsman', 'admin'], // ✨ تم التعديل هنا لـ craftsman
        default: 'customer'
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [31.2357, 30.0444] // وسط القاهرة كافتراضي
        },
        address: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: Date,
    isActive: {
        type: Boolean,
        default: true,
        select: false
    }
}, {
    timestamps: true
});

// الـ Index الجغرافي
userSchema.index({ location: '2dsphere' });

// Middlewares والـ Methods بتاعتك زي ما هي...
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

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