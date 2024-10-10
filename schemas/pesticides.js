const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pesticides = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: [
            'Pesticide',
            'Fungicide',
            'Herbicide',
            'Nematicide',
            'Growth Regulator',
            'Biopesticide',
            'Fertility Supplement',
            'Microbial Inoculant',
            'Seed Treatment',
            'Bactericide',
            'Molluscicide'
        ],
        required: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    composition: {
        type: String, // e.g., "Active Ingredient 10%"
        required: true
    },
    dosage: {
        type: String, // e.g., "50 ml per 10 liters of water"
        required: true
    },
    targetCrops: {
        type: [String], // e.g., ["rice", "wheat", "corn"]
        required: true
    },
    uses: {
        type: String, // Instructions or benefits of use
        required: true
    },
    priceByQuantity: [{
        quantity: { 
            type: String, // e.g., '1L', '2L', '10L' 
            required: true 
        },
        price: { 
            type: Number, // Price for the given quantity 
            required: true 
        }
    }],
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
    faqs: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true }
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Pesticides', Pesticides);
