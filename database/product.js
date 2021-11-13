const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for product documents
const infoSchema = new Schema({
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
      related_product_id: Number
    }
  ]
}, {collection: 'info'});


// turn it into a model
const Product = mongoose.model('info', infoSchema, 'info');

module.exports = Product;