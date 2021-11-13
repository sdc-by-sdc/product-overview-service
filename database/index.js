require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./product.js');
const Style = require('./style.js');

// get products list
const getProductsList = function(page, count, callback) {
  const skip = (page - 1) * count;
  //console.log('PAGE', page, 'COUNT', count, 'SKIP', skip);
  Product.find({}, 'id name slogan description category default_price', { limit: count, skip: skip })
    .then((results) => {
      let formatted = [];
      results.forEach((product) => {
        const format = {
          id: product.id,
          name: product.name,
          slogan: product.slogan,
          description: product.description,
          category: product.category,
          'default_price': product['default_price']
        };
        formatted.push(format);
      });
      formatted = formatted.slice(0, count);
      //console.log('DATABASE FORMATED', formatted.length);
      callback(null, formatted);
    })
    .catch((error) => {
      callback(error, null);
    });
};

// get product info
const getProductInfo = function(productID, callback) {
  info.findOne({id: productID})
    .then((product) => {
      let formatted = {
        id: product.id,
        name: product.name,
        slogan: product.slogan,
        description: product.description,
        category: product.category,
        'default_price': product['default_price'],
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
    'product_id': productID,
    results: []
  };
  Style.find({'productId': productID})
    .then(results => {
      results.forEach(result => {
        let data = {
          "style_id": result.id,
          "name": result.name,
          "original_price": result['original_price'],
          "sale_price": result["sale_price"],
          'default?': Boolean(result['default_style']),
          'photos': result.photos,
          'skus': {}
        }
        if (result['sale_price'] === 'null') {
          data['sale_price'] = '0';
        }
        result.skus.forEach(sku => {
          let skuData = {
            quantity: sku.quantity,
            size: sku.size
          }
          data.skus[sku.id] = skuData;
        })
        //console.log('FORMATTED STYLE', data);
        finalResult.results.push(data);
      })
      callback(null, finalResult);
    })
    .catch(error => {
      callback(error, null);
    })
};

// get product related
const getProductRelated = function(productID, callback) {
  let relatedIDs = [];
  info.findOne({id: productID})
    .then((product) => {
      product.related.forEach((id) => {
        relatedIDs.push(id['related_product_id']);
      });
      //console.log('DATABASE FORMATED', formatted);
      callback(null, relatedIDs);
    })
    .catch((error) => {
      callback(error, null);
    });
};

module.exports = { getProductsList, getProductInfo, getProductStyles, getProductRelated };