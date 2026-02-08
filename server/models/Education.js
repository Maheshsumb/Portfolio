const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    department: { type: String }, // Optional
    year: { type: String, required: true },
    grade: { type: String }, // Optional: CGPA/Percentage
    description: { type: String },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
