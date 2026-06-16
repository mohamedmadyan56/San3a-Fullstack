const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword',authController.forgotPassword)
router.post('/resetPassword',authController.resetPassword)


//for testing our logic 
router.get('/profile',authController.protect,(req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'أهلاً بك في صفحتك الشخصية المحمية! 🔐',
        data:{
            user:req.user
        }
    })
})


router.get('/admin-dashboard', 
  authController.protect, 
  authController.restrictTo('admin'), 
  (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'أهلاً بك يا أدمن في لوحة التحكم السرية! 👑'
    });
});

router.get('/craftsman-orders', 
  authController.protect, 
  authController.restrictTo('craftsman', 'admin'), 
  (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'هنا الطلبات المتاحة لك كحرفي في منصة صنعة 🛠️'
    });
});



module.exports = router;