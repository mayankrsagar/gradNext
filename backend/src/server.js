import './utils/scheduler.js'; // start scheduler

import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import cohortRoutes from './routes/cohort.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/cohort', cohortRoutes);

// Connect to MongoDB & start server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));