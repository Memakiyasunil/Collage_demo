const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

router.route('/').get(getServices);
router.route('/:id').get(getServiceById);
router.route('/create').post(createService);
router.route('/update/:id').put(updateService);
router.route('/delete/:id').delete(deleteService);

module.exports = router;
