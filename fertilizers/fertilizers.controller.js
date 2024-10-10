const { failure, success } = require("../middleware/handleSuccessFailure");
const {addFertilizerService,getFertilizersService,getFertilizerByIdService} = require("./fertilizers.service")


module.exports = {
    addFertilizerController: async (req, res) => {
        try {
            let mainImageUrl;
            let imageGalleryUrls = req.files;

            if (imageGalleryUrls.length > 0) {
                mainImageUrl=imageGalleryUrls[0]
            }

            if(!mainImageUrl){
                return failure(500,res,false,"Product image required!")
            }

            let data=req.body;
            data.mainImage=mainImageUrl.image;
            let imageGallery=[];
            let imageKeys=[];
            for(let i=0;i<imageGalleryUrls.length;i++){
                imageGallery.push(imageGalleryUrls[i].image)
                imageKeys.push(imageGalleryUrls[i].image_key)
            }
            data.imageGallery=imageGallery;
            data.imageKeys=imageKeys;

            data.faqs=JSON.parse(data.faqs)
            
            const insertFertilizerResult=await addFertilizerService(data);

            return success(200,res,true,insertFertilizerResult);

        } catch (error) {
            return failure(500, res, false, error.message)
        }
    },
    getFertilizersController: async (req,res)=>{
        try {
            const getFert=await getFertilizersService();
            return success(200,res,true,"Get fertilizer success",getFert)
        } catch (error) {
            return failure(500,res,false,error.message)
        }
    },
    getFertilizerByIdController: async (req,res)=>{
        try {
            let _id=req.params.fertlizer_id
            const getFertById=await getFertilizerByIdService(_id)
            return success(200,res,true,"Get fertilizer success",getFertById)
        } catch (error) {
            return failure(500,res,false,error.message)
        }
    }
}