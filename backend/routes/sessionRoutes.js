const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getSessions, getSessionById, createSession, updateSession, deleteSession } = require('../controllers/sessionController');

router.get('/', protect, getSessions);
router.get('/:id', protect, getSessionById);
router.post('/', protect, createSession);
router.put('/:id', protect, updateSession);
router.delete('/:id', protect, deleteSession);

module.exports = router;
