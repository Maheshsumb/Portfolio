const Certificate = require('../models/Certificate');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ year: -1 });
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private
const createCertificate = async (req, res) => {
    try {
        const newCertificate = new Certificate(req.body);
        const savedCertificate = await newCertificate.save();
        res.status(201).json(savedCertificate);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private
const updateCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (certificate) {
            Object.assign(certificate, req.body);
            const updatedCertificate = await certificate.save();
            res.json(updatedCertificate);
        } else {
            res.status(404).json({ message: 'Certificate not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private
const deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (certificate) {
            await certificate.deleteOne();
            res.json({ message: 'Certificate removed' });
        } else {
            res.status(404).json({ message: 'Certificate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
