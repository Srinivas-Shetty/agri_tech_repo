const { failure, success } = require("../middleware/handleSuccessFailure");
const { addPesticideService, getPesticideService, getPesticideByIdService } = require("./pesticides.service");

module.exports = {
    addPesticidesController: async (req, res) => {
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
            data.priceByQuantity=JSON.parse(data.priceByQuantity)
            const insertPesticideResult=await addPesticideService(data);

            return success(200,res,true,insertPesticideResult);

        } catch (error) {
            return failure(500, res, false, error.message)
        }
    },
    getPesticidesController: async (req,res)=>{
        try {
            const getPest=await getPesticideService();
            return success(200,res,true,"Get Pesticide success",getPest);
        } catch (error) {
            return failure(500,res,false,error.message);
        }
    },
    getPesticideByIdController: async (req,res)=>{
        try {
            let _id=req.params.pesticide_id
            const getPestById=await getPesticideByIdService(_id)
            return success(200,res,true,"Get getPesticideService success",getPestById)
        } catch (error) {
            return failure(500,res,false,error.message)
        }
    }
}