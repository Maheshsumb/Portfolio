const Message = require('../models/Message');
const nodemailer = require('nodemailer');

const escapeHtml = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// @desc    Create a message (Public)
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Input validation & length restrictions
        if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
            return res.status(400).json({ message: 'Name must be between 1 and 100 characters' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 200) {
            return res.status(400).json({ message: 'A valid email address is required' });
        }

        if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 3000) {
            return res.status(400).json({ message: 'Message must be between 1 and 3000 characters' });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanMessage = message.trim();

        const newMessage = new Message({ name: cleanName, email: cleanEmail, message: cleanMessage });
        const savedMessage = await newMessage.save();

        // Send Email Notification (safely escaped)
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("❌ Email credentials missing in .env file. Skipping email.");
        } else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const recipientEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'maheshsumbpatil87@gmail.com';
            const safeName = escapeHtml(cleanName);
            const safeEmail = escapeHtml(cleanEmail);
            const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br/>');

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: recipientEmail,
                subject: `New Portfolio Message from ${safeName}`,
                text: `You have a new message from ${cleanName} (${cleanEmail}):\n\n${cleanMessage}`,
                html: `
                    <h3>New Portfolio Message</h3>
                    <p><strong>Name:</strong> ${safeName}</p>
                    <p><strong>Email:</strong> ${safeEmail}</p>
                    <p><strong>Message:</strong></p>
                    <p>${safeMessage}</p>
                `
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`✅ Email notification sent to ${recipientEmail}`);
            } catch (error) {
                console.error('❌ Error sending email:', error.message);
            }
        }

        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Get all messages (Admin)
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            await message.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
const markAsRead = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            message.isRead = true;
            const updatedMessage = await message.save();
            res.json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createMessage, getMessages, deleteMessage, markAsRead };
