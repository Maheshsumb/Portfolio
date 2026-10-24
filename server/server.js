const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');

dotenv.config();

const app = express();

// Disable information disclosure header
app.disable('x-powered-by');

// Trust reverse proxy (Render, Railway, Heroku) for secure cookies
app.set('trust proxy', 1);

// HTTP Security Headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Apply general rate limiter across all /api routes
app.use('/api', apiLimiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
    'https://maheshsumb.in',
    'https://www.maheshsumb.in',
    'https://portfolio-bice-kappa-21.vercel.app',
    'https://mahehsumb.in',
    'https://www.mahehsumb.in'
];

// Only allow localhost origins in development environments
if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173');
}

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Connect Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Make uploads folder static if using local storage (Cloudinary doesn't need this, but good practice if fallback)
const path = require('path'); // Ensure path is imported

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Lightweight health check route (zero DB overhead to prevent cold starts)
app.get(['/health', '/api/health'], (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
