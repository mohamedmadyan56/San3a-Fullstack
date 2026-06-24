const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
    enum: ['customer', 'craftsman', 'admin'],
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
      type: [Number],
      default: [31.2357, 30.0444]
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
  },

  // Password Reset Fields
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
});

// Geo Index
userSchema.index({ location: '2dsphere' });

/* =======================
   PASSWORD HASH
======================= */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);

});

/* =======================
   CHECK PASSWORD
======================= */
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/* =======================
   PASSWORD CHANGE CHECK
======================= */
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

/* =======================
   CREATE RESET TOKEN
======================= */
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;