
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supabaseUserId: {
    type: String,
    required: false
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  roundupTotal: {
    type: Number,
    default: 0,
    min: 0
  },
  rewardsEarned: {
    type: Number,
    default: 0,
    min: 0
  },
  lastTransactionDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
