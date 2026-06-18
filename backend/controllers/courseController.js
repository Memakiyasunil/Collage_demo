const Course = require('../models/Course');

// @desc    Create a new course
// @route   POST /api/course/create
// @access  Private/Admin
exports.createCourse = async (req, res) => {
  try {
    const {
      title, type, image, duration, description, category,
      eligibility, totalSeats, format, status, overview,
      careerStats, universities, eligibilityChecklist, salaryInsights
    } = req.body;

    if (!title || !duration || !description) {
      return res.status(400).json({ message: 'Title, duration and description are required' });
    }

    const course = await Course.create({
      title, type, image, duration, description, category,
      eligibility, totalSeats, format, status, overview,
      careerStats, universities, eligibilityChecklist, salaryInsights
    });

    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/course/all
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single course
// @route   GET /api/course/:id
// @access  Public
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update course
// @route   PUT /api/course/update/:id
// @access  Private/Admin
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course, message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/course/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();
    res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
