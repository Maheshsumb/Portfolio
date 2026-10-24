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
        const { title, provider, year, certificateUrl, isVisible } = req.body;
        const newCertificate = new Certificate({
            title,
            provider,
            year,
            certificateUrl,
            isVisible: isVisible !== undefined ? Boolean(isVisible) : true
        });
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
            const { title, provider, year, certificateUrl, isVisible } = req.body;
            if (title !== undefined) certificate.title = title;
            if (provider !== undefined) certificate.provider = provider;
            if (year !== undefined) certificate.year = year;
            if (certificateUrl !== undefined) certificate.certificateUrl = certificateUrl;
            if (isVisible !== undefined) certificate.isVisible = Boolean(isVisible);

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
