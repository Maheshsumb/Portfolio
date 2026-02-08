const Profile = require('../models/Profile');

// @desc    Get profile data
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile || {});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update profile data
// @route   PUT /api/profile
// @access  Private (Admin)
const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (profile) {
            profile.name = req.body.name || profile.name;
            profile.title = req.body.title || profile.title;
            profile.location = req.body.location || profile.location;
            profile.about = req.body.about || profile.about;
            profile.email = req.body.email || profile.email;
            profile.phone = req.body.phone || profile.phone;
            profile.github = req.body.github || profile.github;
            profile.linkedin = req.body.linkedin || profile.linkedin;
            profile.resumeUrl = req.body.resumeUrl || profile.resumeUrl;
            profile.imageUrl = req.body.imageUrl || profile.imageUrl;
            profile.favicon = req.body.favicon || profile.favicon;

            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        } else {
            const newProfile = new Profile(req.body);
            const savedProfile = await newProfile.save();
            res.json(savedProfile);
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

module.exports = { getProfile, updateProfile };
