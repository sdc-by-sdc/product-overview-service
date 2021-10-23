require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('fast-csv');
const fs = require('fs');

const Product = require('./productSchema');
const Style = require('./styleSchema');


// file paths to csv files
const productsPath = process.env.PRODUCT;
const stylesPath = process.env.STYLES;
const featuresPath = process.env.FEATURES;
const skusPath = process.env.SKUS;
const photosPath = process.env.PHOTOS;
const relatedPath = process.env.RELATED;


// upload products
// id name slogan description category default_price
const uploadProducts = function() {
  let productStream = fs.createReadStream(productsPath);
  let productsData = [];
  let convertProducts = csv
    .parse()
    .on('data', (data) => {
      productsData.push({
        id: Number(data[0]),
        name: data[1],
        slogan: data[2],
        description: data[3],
        category: data[4],
        defaultPrice: data[5],
        features: [],
        related: [],
        styles: []
      });
    })
    .on('error', () => {
      console.log('ERROR reading row in products.csv');
    })
    .on('end', () => {
      // first object in array is the headers line, so remove it
      productsData.shift();
      // create new Product document for each other object in array
      Product.insertMany(productsData)
        .then(() => {
          console.log('SUCCESS all products succesfully inserted into database');
        })
        .catch((error) => {
          console.log('ERROR inserting product into database', error);
        });
    });
  productStream.pipe(convertProducts);
};

// upload styles
// id productId name sale_price original_price default_style
const uploadStyles = function() {
  let stylesStream = fs.createReadStream(stylesPath);
  let stylesData = [];
  let convertStyles = csv
    .parse()
    .on('data', (data) => {
      // format style for document
      let formatted = {
        styleID: Number(data[0]),
        name: data[2],
        originalPrice: data[4],
        salePrice: data[3],
        photos: [],
        skus: [],
      };
      if (Number(data[5]) === 1) {
        formatted.default = true;
      } else {
        formatted.default = false;
      }
      stylesData.push(formatted);

      // update document for matching product with id
      if (data[1] !== 'productId') {
        const productID = Number(data[1]);
        const styleSubDoc = {
          styleID: Number(data[0])
        };
        Product.findOne({id: productID})
          .then((document) => {
            document.styles.push(styleSubDoc);
            document.save();
          })
          .catch((error) => {
            console.log('ERROR saving style to ', productID, '/b', error);
          });
      }
    })
    .on('error', () => {
      console.log('ERROR reading row in styles.csv');
    })
    .on('end', () => {
      // first object in array is the headers line, so remove it
      stylesData.shift();
      // create new Product document for each other object in array
      Style.insertMany(stylesData)
        .then(() => {
          console.log('SUCCESS all styles succesfully inserted into database');
        })
        .catch((error) => {
          console.log('ERROR inserting styles into database', error);
        });
    });
  stylesStream.pipe(convertStyles);
};

// upload features
// id product_id feature value
const uploadFeatures = function() {
  let featuresStream = fs.createReadStream(featuresPath);
  let convertFeatures = csv
    .parse()
    .on('data', (data) => {
      // format style for document
      if (data[1] !== 'product_id') {
        let subDoc = {
          feature: data[2],
          value: data[3]
        };
        // update document for matching product with id
        const productID = Number(data[1]);
        Product.findOne({id: productID})
          .then((document) => {
            document.features.push(subDoc);
            document.save();
          })
          .catch((error) => {
            console.log('ERROR saving feature to ', productID, '/b', error);
          });
      }
    })
    .on('error', () => {
      console.log('ERROR reading row in features.csv');
    })
    .on('end', () => {
      // no new documents need creating
      console.log('SUCCESS all features succesfully inserted into database');
    });
  featuresStream.pipe(convertFeatures);
};

// upload skus
// id styleId size quantity
const uploadSKUs = function() {
  let skusStream = fs.createReadStream(skusPath);
  let convertSKUs = csv
    .parse()
    .on('data', (data) => {
      // format style for document
      if (data[1] !== 'styleId') {
        let subDoc = {
          sku: Number(data[0]),
          quantity: data[3],
          size: data[2]
        };
        // update document for matching product with id
        const styleID = Number(data[1]);
        Style.findOne({styleID: styleID})
          .then((document) => {
            document.skus.push(subDoc);
            document.save();
          })
          .catch((error) => {
            console.log('ERROR saving SKU to ', styleID, '/b', error);
          });
      }
    })
    .on('error', () => {
      console.log('ERROR reading row in skus.csv');
    })
    .on('end', () => {
      // no new documents need creating
      console.log('SUCCESS all skus succesfully inserted into database');
    });
  skusStream.pipe(convertSKUs);
};

// upload photos
// id styleId url thumbnail_url
const uploadPhotos = function() {
  let photoStream = fs.createReadStream(photosPath);
  let convertPhotos = csv
    .parse()
    .on('data', (data) => {
      // format style for document
      if (data[1] !== 'styleId') {
        let subDoc = {
          url: data[2],
          thumbnailURL: data[3]
        };
        // update document for matching product with id
        const styleID = Number(data[1]);
        Style.findOne({styleID: styleID})
          .then((document) => {
            document.photos.push(subDoc);
            document.save();
          })
          .catch((error) => {
            console.log('ERROR saving photo to ', styleID, '/b', error);
          });
      }
    })
    .on('error', () => {
      console.log('ERROR reading row in photos.csv');
    })
    .on('end', () => {
      // no new documents need creating
      console.log('SUCCESS all photos succesfully inserted into database');
    });
  photoStream.pipe(convertPhotos);
};

// upload related
// id current_product_id related_product_id
const uploadRelated = function() {
  let relatedStream = fs.createReadStream(relatedPath);
  let convertRelated = csv
    .parse()
    .on('data', (data) => {
      // format style for document
      if (data[1] !== 'current_product_id') {
        let subDoc1 = {
          relatedID: Number(data[2])
        };
        let subDoc2 = {
          relatedID: Number(data[1])
        };
        // update document for matching product with id
        const firstProductID = Number(data[1]);
        const secProductID = Number(data[2]);
        if (firstProductID !== 0 && secProductID !== 0) {
          // first one way
          Product.findOne({id: firstProductID})
            .then((document) => {
              document.related.push(subDoc1);
              document.save();
            })
            .catch((error) => {
              console.log('ERROR saving related id to ', firstProductID, '/b', error);
            });
          // and then the other
          Product.findOne({id: secProductID})
            .then((document) => {
              document.related.push(subDoc2);
              document.save();
            })
            .catch((error) => {
              console.log('ERROR saving related id to ', secProductID, '/b', error);
            });
        }
      }
    })
    .on('error', () => {
      console.log('ERROR reading row in related.csv');
    })
    .on('end', () => {
      // no new documents need creating
      console.log('SUCCESS all related succesfully inserted into database');
    });
  relatedStream.pipe(convertRelated);
};


module.exports = { uploadProducts, uploadStyles, uploadFeatures, uploadSKUs, uploadPhotos, uploadRelated };
