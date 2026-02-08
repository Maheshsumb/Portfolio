const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, upload.single('image'), (req, res) => {
    res.json(req.file.path);
});

module.exports = router;
