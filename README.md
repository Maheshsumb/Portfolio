# Dynamic CMS Portfolio

A fully dynamic, API-driven portfolio application.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT, Cookies (HttpOnly), Bcrypt
- **Storage**: Cloudinary

## Setup Instructions

### 1. Backend Setup
1. Navigate to `server` folder: `cd server`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   NODE_ENV=development
   ```
4. Seed Admin User: `npm run data:import` (Default: admin/password123)
5. Start Server: `npm run dev`

### 2. Frontend Setup
1. Navigate to `client` folder: `cd client`
2. Install dependencies: `npm install`
3. Start Dev Server: `npm run dev`

## Deployment
- **Frontend**: Deploy `client` to Vercel.
- **Backend**: Deploy `server` to Render/Heroku/Railway.
- Update `client/src/services/api.js` base URL to point to production backend.

## Admin Panel
- Access at `/login` or click "Admin Panel" in Navbar (if previously logged in or hidden).
- Use seeded credentials.
