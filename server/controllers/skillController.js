const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
// @access  Public
const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ isVisible: true }).sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all skills (Admin)
// @route   GET /api/skills/all
// @access  Private
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a skill category
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
    const { category, skills } = req.body;
    try {
        const newSkill = new Skill({ category, skills });
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update a skill category
// @route   PUT /api/skills/:id
// @access  Private
// @access  Private
const updateSkill = async (req, res) => {
    const { category, skills, isVisible } = req.body;
    try {
        const skill = await Skill.findById(req.params.id);
        if (skill) {
            skill.category = category || skill.category;
            skill.skills = skills || skill.skills;
            if (isVisible !== undefined) skill.isVisible = isVisible;
            
            const updatedSkill = await skill.save();
            res.json(updatedSkill);
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete a skill category
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (skill) {
            await skill.deleteOne();
            res.json({ message: 'Skill removed' });
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Reorder skills
// @route   PUT /api/skills/reorder
// @access  Private
const reorderSkills = async (req, res) => {
    const { items } = req.body; // Array of IDs in new order
    try {
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ message: 'Invalid data' });
        }
        
        // Use bulkWrite for efficiency
        const bulkOps = items.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index } }
            }
        }));

        await Skill.bulkWrite(bulkOps);
        res.json({ message: 'Skills reordered' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getSkills, getAllSkills, createSkill, updateSkill, deleteSkill, reorderSkills };
