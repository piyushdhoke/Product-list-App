const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  isRecommended: Boolean,
  isBestseller: Boolean,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  imageUrl: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
