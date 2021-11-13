const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for style documents
const extraSchema = new Schema({
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
}, {collection: 'extra'});

// turn it into a model
const Style = mongoose.model('extra', extraSchema);

module.exports = Style;