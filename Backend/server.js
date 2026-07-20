import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

app.use('/api/contact', contactRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected:', mongoose.connection.host);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running at http://localhost:${PORT}`);
//   });
// });
