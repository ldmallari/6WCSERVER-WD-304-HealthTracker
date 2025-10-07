const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['exercise', 'sleep', 'water', 'weight', 'mood', 'meal', 'meditation', 'other']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  duration: {
    type: Number,
    min: [0, 'Duration cannot be negative']
  },
  intensity: {
    type: String,
    enum: ['low', 'moderate', 'high']
  },
  calories: {
    type: Number,
    min: [0, 'Calories cannot be negative']
  },
  sleepHours: {
    type: Number,
    min: [0, 'Sleep hours cannot be negative'],
    max: [24, 'Sleep hours cannot be more than 24']
  },
  sleepQuality: {
    type: String,
    enum: ['poor', 'fair', 'good', 'excellent']
  },
  waterAmount: {
    type: Number,
    min: [0, 'Water amount cannot be negative']
  },
  weight: {
    type: Number,
    min: [10, 'Weight must be at least 10kg'],
    max: [500, 'Weight cannot be more than 500kg']
  },
  mood: {
    type: String,
    enum: ['very-bad', 'bad', 'neutral', 'good', 'very-good']
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

healthLogSchema.index({ user: 1, type: 1, date: -1 });
healthLogSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('HealthLog', healthLogSchema);
