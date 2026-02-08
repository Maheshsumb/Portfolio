const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
    title: { type: String, required: true },
    provider: { type: String, required: true },
    year: { type: String, required: true },
    certificateUrl: { type: String },
    isVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
