const mongoose = require('mongoose');
const Product = require('../../database/productSchema.js');
const Style = require('../../database/styleSchema.js');
const { uploadProducts, uploadStyles, uploadFeatures, uploadSKUs, uploadPhotos, uploadRelated } = require('../../database/import.js');

// create a test database to use without messing with the real one
beforeAll((done) => {
  mongoose.connect("mongodb://localhost:27017/JestTest",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

// paths to test files
const PRODUCT = '/home/sarah/Desktop/HackReactorMisc/SDC/TestCSV/product.csv'
const STYLES = '/home/sarah/Desktop/HackReactorMisc/SDC/TestCSV/styles.csv'
const FEATURES = '/home/sarah/Desktop/HackReactorMisc/SDC/TestCSV/features.csv'
const SKUS = '/home/sarah/Desktop/HackReactorMisc/SDC/TestCSV/skus.csv'
const PHOTOS = '/home/sarah/Desktop/HackReactorMisc/SDC/TestCSV/photos.csv'
const RELATED = '/home/sarah/Desktop/HackReactorMisc/SDC/TestCSV/related.csv'

describe('product.csv', () => {
  xit('should import products to database', async () => {
    await uploadProducts(PRODUCT);
  });
});

describe('styles.csv', () => {
  xit('should import styles to database', async () => {
    await uploadProducts(STYLES);
  })
});

describe('features.csv', () => {
  xit('should import features to database', async () => {
    await uploadProducts(FEATURES);
  })
});

describe('skus.csv', () => {
  xit('should import skus to database', async () => {
    await uploadProducts(SKUS);
  })
})

describe('photos.csv', () => {
  xit('should import photos to database', async () => {
    await uploadProducts(PHOTOS);
  })
})

describe('related.csv', () => {
  xit('should import related to database', async () => {
    await uploadProducts(RELATED);
  })
})