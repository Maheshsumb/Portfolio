const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
