const mongoose = require('mongoose');
const Product = require('./productSchema');
const Style = require('./styleSchema');

// get products list
const getProductsList = function(page, count, callback) {
  const skip = (page - 1) * count;
  Product.find({}, 'id name slogan description category defaultPrice', { limit: count, skip: skip })
    .then((results) => {
      let formatted = [];
      results.forEach((product) => {
        const format = {
          id: product.id,
          name: product.name,
          slogan: product.slogan,
          description: product.description,
          category: product.category,
          'default_price': product.defaultPrice
        };
        formatted.push(format);
      });
      //console.log('DATABASE FORMATED', formatted);
      callback(null, formatted);
    })
    .catch((error) => {
      callback(error, null);
    });
};

// get product info
const getProductInfo = function(productID, callback) {
  Product.findOne({id: productID})
    .then((product) => {
      let formatted = {
        id: product.id,
        name: product.name,
        slogan: product.slogan,
        description: product.description,
        category: product.category,
        'default_price': product.defaultPrice,
        features: []
      };
      product.features.forEach((entry) => {
        let featureEntry = {
          feature: entry.feature,
          value: entry.value
        };
        formatted.features.push(featureEntry);
      });
      //console.log('DATABASE FORMATED', formatted);
      callback(null, formatted);
    })
    .catch((error) => {
      callback(error, null);
    });
};

// get product styles
const getProductStyles = function(productID, callback) {
  let finalResult = {
    'product_id': JSON.stringify(productID),
    results: []
  };
  Product.findOne({id: productID})
    .then((product) => {
      const stylesList = product.styles;
      let stylesPromises = [];
      const formatStyle = function(ID) {
        return new Promise((resolve, reject) => {
          Style.findOne({styleID: ID})
            .then(styleDoc => {
              let formatted = {
                'style_id': styleDoc.styleID,
                name: styleDoc.name,
                'original_price': styleDoc.originalPrice,
                'sale_price': styleDoc.salePrice,
                'default?': styleDoc.default,
                photos: [],
                skus: []
              };
              //console.log('PHOTO', styleDoc);
              styleDoc.photos.forEach(photo => {
                formatted.photos.push({
                  'thumbnail_url': photo.thumbnailURL,
                  url: photo.url
                });
              });
              styleDoc.skus.forEach(sku => {
                formatted.skus.push({
                  sku: sku.sku,
                  quantity: sku.quantity,
                  size: sku.size
                });
              });
              resolve(formatted);
            })
            .catch(error => {
              reject(error);
            });
        });
      };
      stylesList.forEach((style) => {
        let formatted = formatStyle(style.styleID);
        //console.log('FORMATTED', formatted);
        stylesPromises.push(formatted);
      });
      Promise.all(stylesPromises)
        .then(results => {
          results.forEach(style => {
            finalResult.results.push(style);
          });
          //console.log('results', finalResult);
          return finalResult;
        })
        .then(result => {
          callback(null, result);
        });
    })
    .catch((error) => {
      callback(error, null);
    });
};

// get product related
const getProductRelated = function(productID, callback) {
  let relatedIDs = [];
  Product.findOne({id: productID})
    .then((product) => {
      product.related.forEach((id) => {
        relatedIDs.push(id.relatedID);
      });
      //console.log('DATABASE FORMATED', formatted);
      callback(null, relatedIDs);
    })
    .catch((error) => {
      callback(error, null);
    });
};

module.exports = { getProductsList, getProductInfo, getProductStyles, getProductRelated };