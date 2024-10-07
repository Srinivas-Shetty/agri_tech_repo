module.exports={
    success: async (statusCode,res,successValue,msg,data)=>{
        return res.status(statusCode).json({
            statusCode:statusCode,
            success:successValue,
            msg:msg,
            data:data || []
        })
    },
    failure: async (statusCode,res,successValue,msg,data)=>{
        return res.status(statusCode).json({
            statusCode:statusCode,
            success:successValue,
            msg:msg,
            data:data || []
        })
    }
}