const jwt=require('jsonwebtoken');
const { success, failure } = require('./handleSuccessFailure');


module.exports={
    generateTokenForOTP: async (req,res)=>{
        try{
            const generatedOtp=req.generatedOtp;
            const mobileNumber=req.body.mobileNumber;
            const token=jwt.sign(
                {generatedOtp,mobileNumber},
                process.env.ACCESS_TOKEN_KEY,
                {expiresIn:'1hr'}
            );  
            let data=[token]
            return success(200,res,true,"Otp sent succesfully.",data)
            

        } catch(error){
            return failure(500,res,false,error.message);
        }
    },
    authenticateLoginToken: async (req,res,next)=>{
        try{
            const authHeader=await req.headers['authorization'];
            const token=await authHeader &&authHeader.split(' ')[1];

            const verifyToken=jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
            console.log(verifyToken,"verifyTokenverifyToken");
            req.generatedOtp=verifyToken.generatedOtp;
            req.mobileNumber=verifyToken.mobileNumber;
            next()
        } catch(error){
            if(error.message=="jwt expired"){
                error.message="Otp expired, Please resend otp to continue"
            }
           return failure(500,res,false,error.message);
        }
    },
    generateToken: async (req,res)=>{
        try{
            const id= req.id;
            const name= req.name;
            const mobileNumber=req.mobileNumber;
            const role=req.role;

            const token=jwt.sign(
                {id,name,mobileNumber,role},
                process.env.ACCESS_TOKEN_KEY,
                {expiresIn:'30d'}
            );  
            let data={
                id:id,
                name:name,
                mobileNumber:mobileNumber,
                role:role,
                token:token
            }
            return success(200,res,true,"Login succesfull.",data)
            

        } catch(error){
            return failure(500,res,false,error.message);
        }
    },
    authenticateToken: async (req,res,next)=>{
        try{
            const authHeader=await req.headers['authorization'];
            const token=await authHeader &&authHeader.split(' ')[1];

            const verifyToken=jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
            console.log(verifyToken,"verifyTokenverifyToken");
            next();
        } catch(error){
           return failure(500,res,false,error.message);
        }
    },
}