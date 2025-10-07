const express = require('express');
const { body, validationResult } = require('express-validator');
const Article = require('../models/Article');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, tag, search, page = 1, limit = 10, difficulty, sortBy } = req.query;
    
    const query = { 
      isPublished: true,
      category: { $in: ['nutrition', 'exercise', 'mental-health', 'sleep', 'lifestyle', 'medical'] }
    };
    
    if (category && category !== '') {
      query.category = category;
    }
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }

    let sortOptions = { createdAt: -1 };

    const articles = await Article.find(query)
      .populate('author', 'name')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content');

    const total = await Article.countDocuments(query);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      isPublished: true
    }).populate('author', 'name');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', [
  auth,
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('content').trim().isLength({ min: 1, max: 10000 }).withMessage('Content is required and must be less than 10000 characters'),
  body('category').isIn(['nutrition', 'exercise', 'mental-health', 'sleep', 'lifestyle', 'medical'])
    .withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const articleData = {
      ...req.body,
      author: req.user._id
    };

    const article = new Article(articleData);
    await article.save();

    res.status(201).json(article);
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', [
  auth,
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be less than 200 characters'),
  body('content').optional().trim().isLength({ min: 1, max: 10000 }).withMessage('Content must be less than 10000 characters'),
  body('category').optional().isIn(['nutrition', 'exercise', 'mental-health', 'sleep', 'lifestyle', 'medical'])
    .withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found or not authorized' });
    }

    res.json(article);
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found or not authorized' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
