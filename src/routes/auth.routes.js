const express = require('express');
const {register, login, forgetPassword, resetPassword, verifyotp, resendOtp, getAllUsers, } = require('../controllers/auth.controllers');
const isAuth = require('../config/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/forget-password', forgetPassword);
router.put('/reset-password', resetPassword);
router.put('/verify-otp', verifyotp);
router.put('/resend-otp', resendOtp);
router.get('/get-All-users', isAuth, getAllUsers);

module.exports = router;