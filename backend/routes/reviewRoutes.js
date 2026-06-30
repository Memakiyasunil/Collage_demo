const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getReviews, createReview, deleteReview } = require('../controllers/reviewController');

router.get('/', getReviews);
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
