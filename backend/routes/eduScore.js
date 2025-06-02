
const express = require('express');
const EduScore = require('../models/EduScore');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get EduScore
router.get('/', authMiddleware, async (req, res) => {
  try {
    let eduScore = await EduScore.findOne({ userId: req.user._id });
    
    if (!eduScore) {
      eduScore = new EduScore({
        userId: req.user._id
      });
      await eduScore.save();
    }

    res.json(eduScore);
  } catch (error) {
    console.error('Get EduScore error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Complete lesson
router.post('/complete-lesson', authMiddleware, async (req, res) => {
  try {
    const { lessonId, pointsEarned = 10 } = req.body;
    
    if (!lessonId) {
      return res.status(400).json({ error: 'Lesson ID is required' });
    }

    let eduScore = await EduScore.findOne({ userId: req.user._id });
    
    if (!eduScore) {
      eduScore = new EduScore({
        userId: req.user._id
      });
    }

    // Check if lesson already completed
    if (eduScore.completedLessons.includes(lessonId)) {
      return res.status(400).json({ error: 'Lesson already completed' });
    }

    // Update score
    eduScore.score += pointsEarned;
    eduScore.completedLessons.push(lessonId);
    await eduScore.save();

    res.json({
      message: 'Lesson completed successfully',
      scoreEarned: pointsEarned,
      totalScore: eduScore.score,
      completedLessons: eduScore.completedLessons.length
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
