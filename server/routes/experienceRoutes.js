const express = require('express');
const router = express.Router();
const { getExperience, getAllExperience, createExperience, updateExperience, deleteExperience, reorderExperience } = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');

router.put('/reorder', protect, reorderExperience);
router.get('/all', protect, getAllExperience);
router.route('/').get(getExperience).post(protect, createExperience);
router.route('/:id').put(protect, updateExperience).delete(protect, deleteExperience);

module.exports = router;
