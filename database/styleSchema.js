const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for style documents
const styleSchema = new Schema({
  styleID: {
    type: Number,
    unique: true
  },
  name: String,
  originalPrice: String,
  salePrice: String,
  default: Boolean,
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
});

// turn it into a model
const Style = mongoose.model('Style', styleSchema);

module.exports = Style;