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
        const { role, company, duration, description, order, isVisible } = req.body;
        const newExperience = new Experience({
            role,
            company,
            duration,
            description,
            order: order !== undefined ? Number(order) : 0,
            isVisible: isVisible !== undefined ? Boolean(isVisible) : true
        });
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
            const { role, company, duration, description, order, isVisible } = req.body;
            if (role !== undefined) experience.role = role;
            if (company !== undefined) experience.company = company;
            if (duration !== undefined) experience.duration = duration;
            if (description !== undefined) experience.description = description;
            if (order !== undefined) experience.order = Number(order) || 0;
            if (isVisible !== undefined) experience.isVisible = Boolean(isVisible);

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
