require('dotenv').config();
const mongoose = require('mongoose');
// const Product = require('./productAgg');
// const Style = require('./styleAgg');

const { extra, info } = require('./pipeline.js');
const MODE = process.env.MODE;


let DATABASE_URL = process.env.DATABASE_URL;
if (MODE === 'TEST') {
  DATABASE_URL = process.env.TEST_DATABASE_URL;
}


// connect to database with a little error handling
mongoose.connect(`mongodb://${DATABASE_URL}`);
const db = mongoose.connection;
db.on('error', function(error) {
  console.log('ERROR connecting to database', error);
});
db.once('open', function() {
  console.log('SUCCESS database has been connected to');
});

// get products list
const getProductsList = function(page, count, callback) {
  const skip = (page - 1) * count;
  //console.log('PAGE', page, 'COUNT', count, 'SKIP', skip);
  info.find({}, 'id name slogan description category defaultPrice', { limit: count, skip: skip })
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
    'product_id': productID,
    results: []
  };
  extra.find({'productId': productID})
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