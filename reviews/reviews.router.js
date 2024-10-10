const router=require('express').Router();

const { authenticateToken } = require('../middleware/token');
const { writePesticideReviewController } = require('./reviews.controller');


router.post('/write-pesticide-review',authenticateToken,writePesticideReviewController);


module.exports = router;