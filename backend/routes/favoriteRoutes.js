const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getFavorites, toggleFavorite, removeFavorite } = require('../controllers/favoriteController');

router.get('/', protect, getFavorites);
router.post('/', protect, toggleFavorite);
router.delete('/:id', protect, removeFavorite);

module.exports = router;
