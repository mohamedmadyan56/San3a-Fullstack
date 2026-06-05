const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// دالة مساعدة لعمل الـ Token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  });
};

// 1) SIGNUP - إنشاء حساب جديد
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      role: req.body.role
    });

    const token = signToken(newUser._id);
    newUser.password = undefined; // إخفاء الباسورد من الرد

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser }
    });

  } catch (err) {
    // لو حصل مشكلة (مثلاً الإيميل متكرر أو بيانات ناقصة) الـ catch بتمسكها هنا
    res.status(400).json({
      status: 'fail',
      message: 'عذراً، حدث خطأ أثناء إنشاء الحساب',
      error: err.message // هيعرض لك سبب الخطأ بالظبط عشان تراجع وتفهم المشكلة فين
    });
  }
};

// 2) LOGIN - تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1- التأكد من إدخال البيانات
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'من فضلك أدخل البريد الإلكتروني وكلمة المرور'
      });
    }

    // 2- البحث عن المستخدم ومقارنة الباسورد
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    // 3- إرسال التوكن لو البيانات صحيحة
    const token = signToken(user._id);
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'حدث خطأ في السيرفر الداخلي',
      error: err.message
    });
  }
};