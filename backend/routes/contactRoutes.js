const express = require('express');
const router = express.Router();
const { createContact, getContacts, deleteContact } = require('../controllers/contactController');
// const { protect } = require('../middleware/authMiddleware'); // Uncomment when auth is ready

router.post('/create', createContact);
// router.get('/all', protect, getContacts);
router.get('/all', getContacts); // temporary public access
// router.delete('/:id', protect, deleteContact);
router.delete('/:id', deleteContact); // temporary public access

module.exports = router;
