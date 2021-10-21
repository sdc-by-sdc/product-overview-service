import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/productOverview');
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
  ],
  styles: [
    {
      styleID: Number
    }
  ]
});

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
      thumbnailURL: String,
      URL: String
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

// turn schemas into models
const Product = mongoose.model('Product', productSchema);
const Style = mongoose.model('Style', styleSchema);