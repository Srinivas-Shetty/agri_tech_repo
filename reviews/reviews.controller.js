const { success, failure } = require("../middleware/handleSuccessFailure");
const { writePesticideReviewService } = require("./reviews.service");



module.exports={
    writePesticideReviewController:async (req,res)=>{
        try {
            let data=req.body;
            data.user=JSON.parse(data.user);
            const writeReviewResult=await writePesticideReviewService(data);
            return success(200,res,true,writeReviewResult);
        } catch (error) {
            return failure(500,res,false,error.message);
        }
    }
}