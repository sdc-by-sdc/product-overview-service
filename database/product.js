const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for product documents
const productSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      feature: String,
      value: String
    }
  ],
  related: [
    {
      related_id: Number
    }
  ]
});

// turn it into a model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;