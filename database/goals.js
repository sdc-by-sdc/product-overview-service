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
      related_id: Number
    }
  ]
}, {collection: 'info'});

// schema for style documents
const extraSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  product_id: {
    type: Number,
    index: true
  },
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Boolean,
  photos: [
    {
      url: String,
      thumbnailURL: String
    }
  ],
  skus: [
    {
      sku: Number,
      quantity: Number,
      size: String
    }
  ]
}, {collection: 'extra'});

module.exports = { infoSchema, extraSchema };