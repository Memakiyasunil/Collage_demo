const express = require('express');
const router = express.Router();
const { submitApplication, getApplications, updateApplicationStatus } = require('../controllers/jobApplicationController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware'); // Admin protect middleware

// Public route to submit a job application with a file upload (field name: 'resume')
router.post('/', upload.single('resume'), submitApplication);

// Protected routes (Admin only)
router.get('/', protect, getApplications);
router.patch('/:id/status', protect, updateApplicationStatus);

module.exports = router;
