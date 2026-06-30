const JobApplication = require('../models/JobApplication');
// POST /api/job-applications
exports.submitApplication = async (req, res) => {
  try {
    const { name, email, phone, coverLetter } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume file is required.' });
    }

    // Since we're using diskStorage, the file is already saved locally
    const resumeUrl = `${req.protocol}://${req.get('host')}/uploads/resumes/${req.file.filename}`;
          
    // Save to Database
    const application = await JobApplication.create({
      name,
      email,
      phone,
      coverLetter,
      resumeUrl,
    });

    return res.status(201).json({ success: true, data: application, message: 'Application submitted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/job-applications (Admin only)
exports.getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort('-createdAt');
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/job-applications/:id/status (Admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
