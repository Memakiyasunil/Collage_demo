const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, deleteInquiry } = require('../controllers/inquiryController');
// const { protect } = require('../middleware/authMiddleware'); // Uncomment when auth is ready

router.post('/create', createInquiry);
// router.get('/all', protect, getInquiries);
router.get('/all', getInquiries); // temporary public access
// router.delete('/:id', protect, deleteInquiry);
router.delete('/:id', deleteInquiry); // temporary public access

module.exports = router;
