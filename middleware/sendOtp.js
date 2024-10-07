const { failure } = require("./handleSuccessFailure");


module.exports={
    sendOtp: async(req,res,next)=>{
        try{
           const mobilenumber=req.body.mobileNumber;
           console.log(mobilenumber,"mobilenumbermobilenumber");
           const otp=String(mobilenumber).slice(-6);
           console.log(otp,"otp");
           
           req.generatedOtp=otp
           next()
        } catch(error){
            return failure(500,res,false,error.message);
        }
    }
}