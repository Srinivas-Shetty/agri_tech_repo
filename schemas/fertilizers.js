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



[{"question": "How often should I use NitroMax Fertilizer?","answer": "It is recommended to use it once during the growing season."},{"question": "Is this fertilizer suitable for organic farming?","answer": "No, NitroMax is a chemical fertilizer and not suitable for organic farming."},{"question": "Can I mix NitroMax with other fertilizers?","answer": "Yes, but make sure to consult an agricultural expert for optimal results."}]