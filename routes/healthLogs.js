const express = require('express');
const { body, validationResult } = require('express-validator');
const HealthLog = require('../models/HealthLog');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const { type, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    const query = { user: req.user._id };
    
    if (type) {
      query.type = type;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const logs = await HealthLog.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email');

    const total = await HealthLog.countDocuments(query);

    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get health logs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const log = await HealthLog.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('user', 'name email');

    if (!log) {
      return res.status(404).json({ message: 'Health log not found' });
    }

    res.json(log);
  } catch (error) {
    console.error('Get health log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', [
  auth,
  body('type').isIn(['exercise', 'sleep', 'water', 'weight', 'mood', 'meal', 'meditation', 'other'])
    .withMessage('Invalid log type'),
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be less than 100 characters'),
  body('date').optional().isISO8601().withMessage('Invalid date format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const logData = {
      ...req.body,
      user: req.user._id
    };

    const log = new HealthLog(logData);
    await log.save();

    res.status(201).json(log);
  } catch (error) {
    console.error('Create health log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', [
  auth,
  body('type').optional().isIn(['exercise', 'sleep', 'water', 'weight', 'mood', 'meal', 'meditation', 'other'])
    .withMessage('Invalid log type'),
  body('title').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Title must be less than 100 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const log = await HealthLog.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!log) {
      return res.status(404).json({ message: 'Health log not found' });
    }

    res.json(log);
  } catch (error) {
    console.error('Update health log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const log = await HealthLog.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!log) {
      return res.status(404).json({ message: 'Health log not found' });
    }

    res.json({ message: 'Health log deleted successfully' });
  } catch (error) {
    console.error('Delete health log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats/summary', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = { user: req.user._id };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const stats = await HealthLog.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          totalCalories: { $sum: '$calories' },
          totalWater: { $sum: '$waterAmount' },
          avgSleepHours: { $avg: '$sleepHours' },
          avgWeight: { $avg: '$weight' }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    console.error('Get health stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
