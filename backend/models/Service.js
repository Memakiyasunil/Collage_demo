const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: [{
    type: String
  }],
  icon: {
    type: String,
    default: 'Settings' // Default lucide icon name
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
