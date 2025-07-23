
const express = require('express');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get wallet
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const transactions = await Transaction.find({ walletId: wallet._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      ...wallet.toObject(),
      transactions
    });
  } catch (error) {
    console.error('Get wallet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add round-up transaction
router.post('/roundup', authMiddleware, async (req, res) => {
  try {
    const { amount, description } = req.body;
    
    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Calculate roundup (between 5-10 rupees)
    const roundupAmount = Math.floor((Math.random() * 5 + 5) * 100) / 100;

    // Create transaction
    const transaction = new Transaction({
      walletId: wallet._id,
      userId: req.user._id,
      type: 'round-up',
      amount: roundupAmount,
      description: description || 'Round-up from purchase'
    });

    await transaction.save();

    // Update wallet
    wallet.balance += roundupAmount;
    wallet.roundupTotal += roundupAmount;
    wallet.lastTransactionDate = new Date();
    await wallet.save();

    res.json({
      message: 'Round-up transaction added',
      transaction,
      newBalance: wallet.balance
    });
  } catch (error) {
    console.error('Round-up error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add deposit
router.post('/deposit', authMiddleware, async (req, res) => {
  try {
    const { amount, description } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Create transaction
    const transaction = new Transaction({
      walletId: wallet._id,
      userId: req.user._id,
      type: 'deposit',
      amount: amount,
      description: description || 'Manual deposit'
    });

    await transaction.save();

    // Update wallet
    wallet.balance += amount;
    wallet.lastTransactionDate = new Date();
    await wallet.save();

    res.json({
      message: 'Deposit added successfully',
      transaction,
      newBalance: wallet.balance
    });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
