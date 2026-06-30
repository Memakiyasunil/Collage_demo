const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/skillCategoryController');

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', protect, roleCheck('admin'), createCategory);
router.put('/:id', protect, roleCheck('admin'), updateCategory);
router.delete('/:id', protect, roleCheck('admin'), deleteCategory);

module.exports = router;
