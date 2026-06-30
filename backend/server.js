const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const { registerSkillSwapEvents, startSessionReminderScheduler } = require('./socket/skillSwapEvents');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// ─── Socket.io Setup ──────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  },
});

// Make io accessible inside route controllers via req.app.get('io')
app.set('io', io);

// Register Skill Swap real-time events
registerSkillSwapEvents(io);
startSessionReminderScheduler(io);

// ─── Middleware ────────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// ─── Database ─────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/employee_db', {
    family: 4, // Force IPv4 to prevent ECONNREFUSED from Node.js DNS resolver on some Windows networks
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ MongoDB connection error: ', err));

// ─── Existing Routes ──────────────────────────────────────────────
app.use('/api/course', require('./routes/courseRoutes'));
app.use('/api/inquiry', require('./routes/inquiryRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/job-applications', require('./routes/jobApplicationRoutes'));

// ─── User Auth Routes ─────────────────────────────────────────────
app.use('/api/users', require('./routes/userRoutes'));

// ─── Skill Swap Module Routes ─────────────────────────────────────
app.use('/api/skill-categories', require('./routes/skillCategoryRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/wanted-skills', require('./routes/wantedSkillRoutes'));
app.use('/api/skill-matches', require('./routes/skillMatchRoutes'));
app.use('/api/skill-requests', require('./routes/skillRequestRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

// ─── Health Check ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Swarnim Edutech API is running...');
});

// ─── Global Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!', error: err.message });
});

// ─── Start Server ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
