const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    githubLink: { type: String },
    liveLink: { type: String },
    imageUrls: [{ type: String }], // Changed to array
    // Keeping legacy field optional for migration safety, or we can just rely on imageUrls[0]
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
