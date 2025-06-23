
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supabaseWalletId: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ['round-up', 'deposit', 'withdrawal', 'reward'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'success'
  },
  description: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
