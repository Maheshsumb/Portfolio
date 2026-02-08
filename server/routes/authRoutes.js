const express = require('express');
const router = express.Router();
const { loginUser, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
