const router=require("express").Router();
const upload = require("../middleware/multer");
const { uploadMultipleImages } = require("../middleware/s3Service");
const { authenticateToken } = require("../middleware/token");
const { addPesticidesController, getPesticidesController, getPesticideByIdController } = require("./pesticides.controller");


router.post('/add-pesticide',authenticateToken,upload.array('images', 10),uploadMultipleImages,addPesticidesController);
router.get('/get-pesticides',authenticateToken,getPesticidesController);

router.get('/get-pesticide/:pesticide_id',authenticateToken,getPesticideByIdController)


module.exports=router;