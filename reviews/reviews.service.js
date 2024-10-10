const pesticidesReview = require("../schemas/pesticidesReview")




module.exports={
    writePesticideReviewService:async (data)=>{
        try {
            await pesticidesReview.create(data);
            return "Review success"
        } catch (error) {
            throw new Error(error.message)
        }
    }
}