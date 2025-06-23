const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const EduScore = require('../models/EduScore');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Sync data from Supabase to MongoDB
router.post('/from-supabase', authMiddleware, async (req, res) => {
  try {
    const { supabaseUserId } = req.body;
    
    if (!supabaseUserId) {
      return res.status(400).json({ error: 'Supabase user ID is required' });
    }

    // Update user with Supabase ID
    await User.findByIdAndUpdate(req.user._id, { supabaseId: supabaseUserId });

    // Sync wallet data
    const { data: supabaseWallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', supabaseUserId)
      .single();

    if (supabaseWallet && !walletError) {
      await Wallet.findOneAndUpdate(
        { userId: req.user._id },
        {
          supabaseUserId: supabaseUserId,
          balance: supabaseWallet.balance,
          roundupTotal: supabaseWallet.roundup_total,
          rewardsEarned: supabaseWallet.rewards_earned,
          lastTransactionDate: supabaseWallet.last_transaction_date
        },
        { upsert: true }
      );
    }

    // Sync EduScore data
    const { data: supabaseEduScore, error: eduError } = await supabase
      .from('edu_scores')
      .select('*')
      .eq('user_id', supabaseUserId)
      .single();

    if (supabaseEduScore && !eduError) {
      await EduScore.findOneAndUpdate(
        { userId: req.user._id },
        {
          supabaseUserId: supabaseUserId,
          score: supabaseEduScore.score,
          completedLessons: supabaseEduScore.completed_lessons || [],
          lastUpdated: supabaseEduScore.last_updated
        },
        { upsert: true }
      );
    }

    res.json({ message: 'Data synced from Supabase successfully' });
  } catch (error) {
    console.error('Sync from Supabase error:', error);
    res.status(500).json({ error: 'Server error during sync' });
  }
});

// Sync data from MongoDB to Supabase
router.post('/to-supabase', authMiddleware, async (req, res) => {
  try {
    // This would require Supabase service role key for admin operations
    // For now, this is a placeholder that shows the structure
    res.json({ message: 'Sync to Supabase not implemented (requires service role)' });
  } catch (error) {
    console.error('Sync to Supabase error:', error);
    res.status(500).json({ error: 'Server error during sync' });
  }
});

// Get sync status
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const wallet = await Wallet.findOne({ userId: req.user._id });
    const eduScore = await EduScore.findOne({ userId: req.user._id });

    res.json({
      user: {
        hasSupabaseId: !!user.supabaseId,
        supabaseId: user.supabaseId
      },
      wallet: {
        synced: !!wallet?.supabaseUserId,
        balance: wallet?.balance || 0
      },
      eduScore: {
        synced: !!eduScore?.supabaseUserId,
        score: eduScore?.score || 0
      }
    });
  } catch (error) {
    console.error('Get sync status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
