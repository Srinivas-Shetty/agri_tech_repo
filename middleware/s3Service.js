
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { failure } = require('./handleSuccessFailure');

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
  },
});


const uploadFile = async (file, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
  };

  try {
    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    return {
      Location: `https://${bucketName}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${file.originalname}`,
      Key: Date.now()+'-'+file.originalname,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(error.message);
  }
};

const uploadMultipleFiles = async (files, bucketName) => {
  const uploadPromises = files.map(async (file) => {
    try {
      const result = await uploadFile(file, bucketName);
      return { image: result.Location, image_key: result.Key };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(error.message);
    }
  });

  return Promise.all(uploadPromises);
};

module.exports = {
//   uploadProfileImage: async (req, res, next) => {
//     try {
//       const file = req.file;
//       if(!file){
//         return next();
//       }
//       const bucketName = process.env.AWS_BUCKET_NAME;
//       const result = await uploadFile(file, bucketName);
//       console.log(result,"resultresultresultresult");
//       // return
//       req.result = [{ image: result.Location, image_key: result.Key }];
//       next();
//     } catch (error) {
//         console.log(error);
//       res.status(500).json({
//         status:false,
//         message: 'Error uploading files to S3' 
//     });
//     }
//   },

  uploadMultipleImages: async (req, res, next) => {
    try {
      const files = req.files;
      // console.log(files,"hdjwhdjhajh");
      if(!files){ 
        return failure(500,res,false,"Product image required!")
      }
      const bucketName = process.env.AWS_BUCKET_NAME;
      const results = await uploadMultipleFiles(files, bucketName);
      req.files = results;
      next();
    } catch (error) {
        return failure(500,res,false,error.message);
    }
  },
};
