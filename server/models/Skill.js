const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    category: { type: String, required: true }, // e.g. Frontend, Backend, Tools
    skills: [{ type: String, required: true }],
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
