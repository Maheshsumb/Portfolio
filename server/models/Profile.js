const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    about: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    github: { type: String },
    linkedin: { type: String },
    resumeUrl: { type: String },
    imageUrl: { type: String },
    favicon: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
