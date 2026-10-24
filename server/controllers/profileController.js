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

        const fields = [
            'name', 'title', 'location', 'about', 'email', 'email2', 
            'phone', 'github', 'linkedin', 'instagram', 'whatsapp', 
            'resumeUrl', 'imageUrl', 'favicon', 'theme'
        ];

        if (profile) {
            fields.forEach(field => {
                if (req.body[field] !== undefined) {
                    profile[field] = req.body[field];
                }
            });

            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        } else {
            const profileData = {};
            fields.forEach(field => {
                if (req.body[field] !== undefined) {
                    profileData[field] = req.body[field];
                }
            });
            const newProfile = new Profile(profileData);
            const savedProfile = await newProfile.save();
            res.json(savedProfile);
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

module.exports = { getProfile, updateProfile };
