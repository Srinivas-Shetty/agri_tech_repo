const multer = require('multer');
const storage = multer.memoryStorage();
const fileSizeLimit = 100 * 1024 * 1024; // 1MB
const upload = multer({
    storage: storage,
    limits: {
        fileSize: fileSizeLimit
    }
});


module.exports=upload;