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
  defaultPrice: String,
  features: [
    {
      feature: String,
      value: String
    }
  ],
  related: [
    {
      relatedID: Number
    }
  ]
});

// turn it into a model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;