const express = require('express');
const router = express.Router();
const { getEducation, getAllEducation, createEducation, updateEducation, deleteEducation, reorderEducation } = require('../controllers/educationController');
const { protect } = require('../middleware/authMiddleware');

router.put('/reorder', protect, reorderEducation);
router.get('/all', protect, getAllEducation);
router.route('/').get(getEducation).post(protect, createEducation);
router.route('/:id').put(protect, updateEducation).delete(protect, deleteEducation);

module.exports = router;
