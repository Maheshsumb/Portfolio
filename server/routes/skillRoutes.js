const express = require('express');
const router = express.Router();
const { getSkills, getAllSkills, createSkill, updateSkill, deleteSkill, reorderSkills } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.put('/reorder', protect, reorderSkills);
router.get('/all', protect, getAllSkills);
router.route('/').get(getSkills).post(protect, createSkill);
router.route('/:id').put(protect, updateSkill).delete(protect, deleteSkill);

module.exports = router;
