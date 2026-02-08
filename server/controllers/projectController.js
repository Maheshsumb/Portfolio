const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all projects (Admin)
// @route   GET /api/projects/all
// @access  Private
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            Object.assign(project, req.body);
            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Reorder projects
// @route   PUT /api/projects/reorder
// @access  Private
const reorderProjects = async (req, res) => {
    const { items } = req.body; // Array of IDs in new order
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

        await Project.bulkWrite(bulkOps);
        res.json({ message: 'Projects reordered' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProjects, getAllProjects, createProject, updateProject, deleteProject, reorderProjects };
