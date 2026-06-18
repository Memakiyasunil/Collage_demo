const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  programCount: {
    type: Number,
    default: 0,
  },
  colorTheme: {
    type: String,
    default: 'purple',
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Partner', partnerSchema);
