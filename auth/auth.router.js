const router=require('express').Router();

const {sendOtp} = require('../middleware/sendOtp');
const { generateTokenForOTP, authenticateLoginToken, generateToken } = require('../middleware/token');
const { storeOtpController,loginController } = require('./auth.controller');

router.post('/send-otp',sendOtp,storeOtpController,generateTokenForOTP);
router.post('/login',authenticateLoginToken,loginController,generateToken);


module.exports = router;