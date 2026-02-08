const express = require('express');
const router = express.Router();
const { createMessage, getMessages, deleteMessage, markAsRead } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createMessage).get(protect, getMessages);
router.route('/:id').delete(protect, deleteMessage);
router.route('/:id/read').put(protect, markAsRead);

module.exports = router;
