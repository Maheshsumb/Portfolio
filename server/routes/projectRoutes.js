const express = require('express');
const router = express.Router();
const { getProjects, getAllProjects, createProject, updateProject, deleteProject, reorderProjects } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.put('/reorder', protect, reorderProjects);
router.get('/all', protect, getAllProjects);
router.route('/').get(getProjects).post(protect, createProject);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);

module.exports = router;
