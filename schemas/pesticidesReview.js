const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PesticideReviewSchema = new Schema({
    pesticideId: {
        type: Schema.Types.ObjectId,
        ref: 'Pesticides', // Reference to the Pesticide schema
        required: true
    },
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',  // Reference to the User schema
            required: true
        }
    },
    rating: {
        type: Number,
        required: true,
        min: 1,   // Minimum rating value
        max: 5    // Maximum rating value
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('PesticideReview', PesticideReviewSchema);
