const router=require("express").Router();
const upload = require("../middleware/multer");
const { uploadMultipleImages } = require("../middleware/s3Service");
const { authenticateToken } = require("../middleware/token");
const { addFertilizerController,getFertilizersController,getFertilizerByIdController } = require("./fertilizers.controller");


router.post('/add-fertilizer',authenticateToken,upload.array('images', 10),uploadMultipleImages,addFertilizerController);
router.get('/get-fertilizers',authenticateToken,getFertilizersController);

router.get('/get-fertilizer/:fertlizer_id',authenticateToken,getFertilizerByIdController)


module.exports=router;