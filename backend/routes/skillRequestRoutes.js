const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getRequests, getRequestById, createRequest, updateRequest, deleteRequest } = require('../controllers/skillRequestController');

router.get('/', protect, getRequests);
router.get('/:id', protect, getRequestById);
router.post('/', protect, createRequest);
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
