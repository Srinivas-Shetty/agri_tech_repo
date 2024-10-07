const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Schema with timestamps
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['farmer', 'supplier', 'admin'],
    required: true
  },
  deliveryAddresses: [{
    contact_number:{
        type:String
    },
    address: {
      type: String
    },
    city: {
        type: String,
        required: true
      },
    state: {
      type: String
    },
    postalCode: {
      type: String
    }
  }],

  
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);
