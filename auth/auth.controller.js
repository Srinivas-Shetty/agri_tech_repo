const { failure } = require("../middleware/handleSuccessFailure");
const { storeOtpService,loginService } = require("./auth.service");



module.exports={
    storeOtpController:async (req,res,next)=>{
        try {
            const generatedOtp=req.generatedOtp;
            const mobileNumber=req.body.mobileNumber;
            const otpSend=await storeOtpService(mobileNumber,generatedOtp);
            next()
        } catch (error) {
            return failure(500,res,false,error.message)
        }
    },
    loginController:async (req,res,next)=>{
        try {
            const userOtp=req.body.userOtp;
            if(!userOtp){
                return failure(400,res,false,"OTP is required!")
            }
            const mobileNumber=req.mobileNumber;
            const result=await loginService(mobileNumber,userOtp);
            console.log(result,"result");
            req.id=result._id;
            req.name=result.name;
            req.mobileNumber=result.mobileNumber;
            req.role=result.role;
            
            next();

        } catch (error) {
            return failure(500,res,false,error.message)
        }
    }
}