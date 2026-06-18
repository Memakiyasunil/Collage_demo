const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['UG', 'PG', 'INT'],
    default: 'UG',
  },
  image: {
    type: String, // Cloudinary URL or path
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
  },
  totalSeats: {
    type: String,
  },
  format: {
    type: String,
  },
  status: {
    type: String,
    default: 'Accepting Applications',
  },
  overview: {
    type: String,
  },
  category: {
    type: String,
  },
  careerStats: {
    jobsInIndia: { type: String },
    avgSalary: { type: String },
    companiesHiring: { type: String },
  },
  universities: [{ type: String }],
  eligibilityChecklist: [{ type: String }],
  salaryInsights: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
