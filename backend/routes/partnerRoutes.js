const express = require('express');
const router = express.Router();
const {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner
} = require('../controllers/partnerController');

router.get('/', getPartners);
router.get('/:id', getPartnerById);
router.post('/create', createPartner);
router.put('/update/:id', updatePartner);
router.delete('/delete/:id', deletePartner);

module.exports = router;
