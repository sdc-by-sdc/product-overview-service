const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for style documents
const styleSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  productId: {
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
      id: Number,
      quantity: Number,
      size: String
    }
  ]
});

// turn it into a model
const Style = mongoose.model('Style', styleSchema);

module.exports = Style;