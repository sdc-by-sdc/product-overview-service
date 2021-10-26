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
  let convertProducts = csv
    .parse()
    .on('data', (data) => {
      // first line in file is the headers line, so ignore it
      if (data[0] !== 'id') {
        const productID = Number(data[0]);
        // format data
        const productData = {
          id: productID,
          name: data[1],
          slogan: data[2],
          description: data[3],
          category: data[4],
          defaultPrice: data[5],
          features: [],
          related: [],
          styles: []
        };
        // create new Product document for each other object in array
        Product.insertMany(productData, (error, result) => {
          if (error) {
            console.log('ERROR inserting product ', productID, ' into database', error);
          } else {
            console.log('SUCCESS inserting product ', productID, ' into database');
          }
        });
      }
    })
    .on('error', () => {
      console.log('ERROR reading row in products.csv');
    })
    .on('end', () => {
      console.log('SUCCESS all products succesfully inserted into database');
    });
  productStream.pipe(convertProducts);
};

// upload styles
// id productId name sale_price original_price default_style
const uploadStyles = function() {
  let stylesStream = fs.createReadStream(stylesPath);
  let convertStyles = csv
    .parse()
    .on('data', (data) => {
      // first line in file is the headers line, so ignore it
      if (data[0] !== 'id') {
        convertStyles.pause();
        const styleID = Number(data[0]);
        // format style for document
        let styleData = {
          styleID: styleID,
          name: data[2],
          originalPrice: data[4],
          salePrice: data[3],
          photos: [],
          skus: [],
        };
        if (Number(data[5]) === 1) {
          styleData.default = true;
        } else {
          styleData.default = false;
        }
        // create new style document
        Style.insertMany(styleData, (error, result) => {
          if (error) {
            console.log('ERROR inserting style ', styleID, ' into database', error);
          } else {
            console.log('SUCCESS inserting style ', styleID, ' into database');
          }
        });
        // update document for matching product with id
        const productID = Number(data[1]);
        const styleSubDoc = {
          styleID: Number(data[0])
        };
        Product.findOne({id: productID})
          .then((document) => {
            document.styles.push(styleSubDoc);
            document.save();
            console.log('SUCCESS saving style', styleID, 'in product', productID);
            convertStyles.resume();
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
      console.log('SUCCESS all styles succesfully inserted into database');
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
      console.log('FEATURE NUMBER', Number(data[0]));
      // format style for document
      if (data[1] !== 'product_id') {
        // pause the parser
        convertFeatures.pause();
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
            console.log('feature', Number(data[0]), 'saved to', productID);
            convertFeatures.resume();
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
        convertSKUs.pause();
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
            console.log('sku', Number(data[0]), 'inserted into style', styleID);
            convertSKUs.resume();
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
  console.log('I AM STARTING');
  console.log(photosPath);
  console.log(relatedPath);
  let convertPhotos = csv
    // there was some kind of craziness with the parsing of strings for the URLs so I'm manually handling the quotes later
    .parse({ quote: null })
    .on('data', (data) => {
      console.log('I AM WORKING');
      //format style for document
      if (data[0] !== 'id') {
        // pause the parser
        convertPhotos.pause();
        // I'm manually handling the quotes here
        let url = data[2].slice(1);
        url = url.slice(0, url.length - 1);
        let thumbnailURL = data[3].slice(1);
        thumbnailURL = thumbnailURL.slice(0, thumbnailURL.length - 1);
        let subDoc = {
          url,
          thumbnailURL
        };
        // update document for matching style with id
        const styleID = Number(data[1]);
        Style.findOne({styleID: styleID})
          .then((document) => {
            //console.log('FORMATTED', subDoc);
            document.photos.push(subDoc);
            document.save();
            console.log('SUCCESS saved photo', Number(data[0]), 'to style', styleID);
            convertPhotos.resume();
          })
          .catch((error) => {
            console.log('ERROR saving photo to ', styleID, '/b', error);
          });
      }
    })
    .on('error', (error) => {
      console.log('ERROR reading row in photos.csv', error);
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
      if (data[0] !== 'id') {
        convertRelated.pause();
        let subDoc = {
          relatedID: Number(data[2])
        };
        // update document for matching product with id
        const productID = Number(data[1]);
        Product.findOne({id: productID})
          .then((document) => {
            document.related.push(subDoc);
            document.save();
            console.log('SUCCESS saved related id', Number(data[0]), 'to product', productID);
            convertRelated.resume();
          })
          .catch((error) => {
            console.log('ERROR saving related id to ', firstProductID, '/b', error);
          });
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



// db.products.updateMany({ }, { $set: { related: [] } })