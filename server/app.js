require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const URL_BASE = process.env.URL_BASE;
const { uploadProducts, uploadStyles, uploadFeatures, uploadSKUs, uploadPhotos, uploadRelated } = require('../database/import.js');
const { getProductsList, getProductInfo, getProductStyles, getProductRelated } = require('../database/index.js');



// API ROUTES

// GET /products
app.get('/products', (req, res) => {
  // parse out specific page or count request
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  //console.log('PAGE', page, 'COUNT', count);
  // invoke function to interact with database with a callback
  getProductsList(page, count, (err, data) => {
    if (err) {
      console.log('ERROR getting products list', err);
      res.sendStatus(404);
    } else {
      //console.log('DATA', data);
      res.status(200);
      res.send(data);
    }
  });
});

// GET /products/:product_id
app.get('/products/:product_id', (req, res) => {
  // parse out product_id from URL
  const productID = req.params['product_id'];
  // invoke function to interact with database with a callback
  getProductInfo(productID, (err, data) => {
    if (err) {
      console.log('ERROR getting product info', err);
      res.sendStatus(404);
    } else {
      //console.log('DATA', data);
      res.status(200);
      res.send(data);
    }
  });
});

// GET /products/:product_id/styles
app.get('/products/:product_id/styles', (req, res) => {
  // parse out product_id from URL
  const productID = req.params['product_id'];
  // invoke function to interact with database with a callback
  getProductStyles(productID, (err, data) => {
    if (err) {
      console.log('ERROR getting product styles', err);
      res.sendStatus(404);
    } else {
      //console.log('ENTIRE RESPONSE', data);
      //console.log('FIRST STYLE', data.results[0]);
      res.status(200);
      res.send(data);
    }
  });
});

// GET /products/:product_id/related
app.get('/products/:product_id/related', (req, res) => {
  // parse out product_id from URL
  const productID = req.params['product_id'];
  // invoke function to interact with database with a callback
  getProductRelated(productID, (err, data) => {
    if (err) {
      console.log('ERROR getting related products', err);
      res.sendStatus(404);
    } else {
      //console.log('DATA', data);
      res.status(200);
      res.send(data);
    }
  });
});


// IMPORTING CSV FILES; UN COMMENT ONE AT A TIME IN ORDER
// AND RUN THE SERVER UNTIL FINISHED; APPROX TIMES LISTED

//uploadProducts();         // 5 minutes
//uploadStyles();           // 1 hour
//uploadFeatures();         // 1 hour
//uploadSKUs();             // 3 hours
//uploadPhotos();           // 2 hours
//uploadRelated();          // 1.5 hours

module.exports = app;
