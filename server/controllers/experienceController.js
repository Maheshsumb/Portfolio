const Experience = require('../models/Experience');

// @desc    Get all experience (Public - Visible only)
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
    try {
        const experience = await Experience.find({ isVisible: true }).sort({ order: 1 });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all experience (Admin - All)
// @route   GET /api/experience/all
// @access  Private
const getAllExperience = async (req, res) => {
    try {
        const experience = await Experience.find().sort({ order: 1 });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create experience
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res) => {
    try {
        const newExperience = new Experience(req.body);
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (experience) {
            Object.assign(experience, req.body);
            const updatedExperience = await experience.save();
            res.json(updatedExperience);
        } else {
            res.status(404).json({ message: 'Experience not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (experience) {
            await experience.deleteOne();
            res.json({ message: 'Experience removed' });
        } else {
            res.status(404).json({ message: 'Experience not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Reorder experience
// @route   PUT /api/experience/reorder
// @access  Private
const reorderExperience = async (req, res) => {
    const { items } = req.body;
    try {
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ message: 'Invalid data' });
        }
        
        const bulkOps = items.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index } }
            }
        }));

        await Experience.bulkWrite(bulkOps);
        res.json({ message: 'Experience reordered' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getExperience, getAllExperience, createExperience, updateExperience, deleteExperience, reorderExperience };
