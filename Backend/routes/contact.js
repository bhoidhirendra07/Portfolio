import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// POST /api/contact — Save contact form submission to MongoDB
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.',
      });
    }

    const newMessage = await Message.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message received!",
      data: newMessage,
    });
  } catch (error) {
    console.error('Contact route error:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

export default router;
