const express = require('express');
const router = express.Router();
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController');
// const { protect } = require('../middleware/authMiddleware'); // Uncomment when auth is ready

router.get('/all', getCourses);
router.get('/:id', getCourseById);
// router.post('/create', protect, createCourse);
router.post('/create', createCourse); // temporary public access
// router.put('/update/:id', protect, updateCourse);
router.put('/update/:id', updateCourse); // temporary public access
// router.delete('/:id', protect, deleteCourse);
router.delete('/:id', deleteCourse); // temporary public access

module.exports = router;
