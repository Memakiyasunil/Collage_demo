const Partner = require('../models/Partner');

// @desc    Get all partners
// @route   GET /api/partners
// @access  Public
exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: partners });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get single partner
// @route   GET /api/partners/:id
// @access  Public
exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Create a partner
// @route   POST /api/partners/create
// @access  Private/Admin
exports.createPartner = async (req, res) => {
  try {
    const { name, programCount, colorTheme, description, website, logoUrl, isActive } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Partner name is required' });
    }
    const partner = await Partner.create({ name, programCount, colorTheme, description, website, logoUrl, isActive });
    res.status(201).json({ success: true, data: partner, message: 'Partner created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Update a partner
// @route   PUT /api/partners/update/:id
// @access  Private/Admin
exports.updatePartner = async (req, res) => {
  try {
    let partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: partner, message: 'Partner updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a partner
// @route   DELETE /api/partners/delete/:id
// @access  Private/Admin
exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    await partner.deleteOne();
    res.status(200).json({ success: true, message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
