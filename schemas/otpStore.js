const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const Schema = mongoose.Schema;


const otpSchema = new Schema({
  mobileNumber: {
    type: String,
    required: true
  },
  otpCode: {
    type: String,
    required: true
  },
}, { timestamps: true });  


otpSchema.pre('save', async function(next) {
    const otp = this;
    if (!otp.isModified('otpCode')) return next();
    
    const salt = await bcrypt.genSalt(10);
    otp.otpCode = await bcrypt.hash(otp.otpCode, salt);
    next();
  });

module.exports = mongoose.model('OTPStore', otpSchema);
