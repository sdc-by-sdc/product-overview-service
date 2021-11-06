const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String
}, {collection: 'product'});

const stylesSchema = new Schema({
    id: {
      type: Number,
      unique: true
    },
    productId: {
      type: Number,
      index: true
    },
    name: String,
    sale_price: String,
    original_price: String,
    default_style: Boolean
}, {collection: 'styles'});

const featuresSchema = new Schema({
  id: Number,
  product_id: {
    type: Number,
    index: true
  },
  feature: String,
  value: String
}, {collection: 'features'});

const skusSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  styleId: {
    type: Number,
    index: true
  },
  size: String,
  quantity: Number
}, {collection: 'skus', _id: false});

const photosSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  styleId: {
    type: Number,
    index: true
  },
  url: String,
  thumbnail_url: String
}, {collections: 'photos'});

const relatedSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  current_product_id: {
    type: Number,
    index: true
  },
  related_product_id: Number
}, {collection: 'related'});



module.exports = { productSchema, stylesSchema, featuresSchema, skusSchema, photosSchema, relatedSchema };