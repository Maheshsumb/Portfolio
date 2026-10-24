const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            username: user.username,
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get current user session
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.json({
        _id: req.user._id,
        username: req.user.username,
    });
};

module.exports = {
    loginUser,
    logoutUser,
    getMe,
};
