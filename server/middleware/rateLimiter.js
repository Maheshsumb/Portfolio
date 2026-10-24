const rateLimit = require('express-rate-limit');

// General API Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // limit each IP to 300 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests from this IP. Please try again later.' }
});

// Strict limiter for authentication (prevents brute-force & credential stuffing)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per IP per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many login attempts. Account temporarily locked for 15 minutes.' }
});

// Anti-spam limiter for contact form (prevents SMTP quota exhaustion & mail flooding)
const messageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 messages per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many messages sent. Please wait a few minutes before sending another.' }
});

module.exports = {
    apiLimiter,
    loginLimiter,
    messageLimiter
};
