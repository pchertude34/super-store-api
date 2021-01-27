const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requried: true,
  },
  price: {
    type: Number,
    required: true,
  },
  avgRating: {
    type: Number,
    required: false,
    defualt: 0,
  },
  isOnSale: {
    type: Boolean,
    required: false,
    default: false,
  },
  stockCount: {
    type: Number,
    required: false,
    default: 10,
  },
  imageUrl: {
    type: String,
    requried: false,
  },
});

itemSchema.index({ name: 'text' });

module.exports = mongoose.model('item', itemSchema);
