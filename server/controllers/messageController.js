const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @desc    Create a message (Public)
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Message({ name, email, message });
        const savedMessage = await newMessage.save();

        // Send Email Notification
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

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'maheshsumbpatil87@gmail.com',
                subject: `New Portfolio Message from ${name}`,
                text: `You have a new message from ${name} (${email}):\n\n${message}`,
                html: `
                    <h3>New Portfolio Message</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('✅ Email notification sent to maheshsumbpatil87@gmail.com');
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
