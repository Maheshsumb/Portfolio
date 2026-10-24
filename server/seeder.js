const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional, but nice
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        if (!process.env.ADMIN_USER || !process.env.ADMIN_PASS) {
            console.error('❌ CRITICAL: Cannot seed without ADMIN_USER and ADMIN_PASS environment variables set.');
            process.exit(1);
        }

        await User.deleteMany();

        const adminUser = new User({
            username: process.env.ADMIN_USER,
            password: process.env.ADMIN_PASS
        });

        await adminUser.save();

        console.log('✅ Admin User Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
