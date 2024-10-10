const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    fertilizerType: {
        type: String,
        enum: ['organic', 'chemical', 'biofertilizer'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: String
    },
    quantityPerUnit: {
        type: String,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
    imageGallery: [
        { type: String }
    ],
    imageKeys: [
        { type: String }
    ],
    description: {
        type: String
    },
    targetCrops: {
        type: String
    },
    uses: {
        type: String
    },
    dosage: {
        type: String
    },
    faqs: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true }  
        }
    ],
}, { timestamps: true }); 

module.exports = mongoose.model('Fertilizer', fertilizerSchema);



