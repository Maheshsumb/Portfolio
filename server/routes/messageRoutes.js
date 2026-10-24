const express = require('express');
const router = express.Router();
const { createMessage, getMessages, deleteMessage, markAsRead } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const { messageLimiter } = require('../middleware/rateLimiter');

router.route('/').post(messageLimiter, createMessage).get(protect, getMessages);
router.route('/:id').delete(protect, deleteMessage);
router.route('/:id/read').put(protect, markAsRead);

module.exports = router;
