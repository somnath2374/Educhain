
const mongoose = require('mongoose');

const eduScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supabaseUserId: {
    type: String,
    required: false
  },
  score: {
    type: Number,
    default: 0,
    min: 0
  },
  completedLessons: {
    type: [String],
    default: []
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

eduScoreSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('EduScore', eduScoreSchema);
