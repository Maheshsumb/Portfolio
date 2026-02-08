const Education = require('../models/Education');

// @desc    Get all education (Public - Visible only)
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res) => {
    try {
        const education = await Education.find({ isVisible: true }).sort({ order: 1 });
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all education (Admin - All)
// @route   GET /api/education/all
// @access  Private
const getAllEducation = async (req, res) => {
    try {
        const education = await Education.find().sort({ order: 1 });
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create education
// @route   POST /api/education
// @access  Private
const createEducation = async (req, res) => {
    try {
        const newEducation = new Education(req.body);
        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (education) {
            Object.assign(education, req.body);
            const updatedEducation = await education.save();
            res.json(updatedEducation);
        } else {
            res.status(404).json({ message: 'Education not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (education) {
            await education.deleteOne();
            res.json({ message: 'Education removed' });
        } else {
            res.status(404).json({ message: 'Education not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Reorder education
// @route   PUT /api/education/reorder
// @access  Private
const reorderEducation = async (req, res) => {
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

        await Education.bulkWrite(bulkOps);
        res.json({ message: 'Education reordered' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getEducation, getAllEducation, createEducation, updateEducation, deleteEducation, reorderEducation };
