require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const URL_BASE = process.env.URL_BASE;
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
  console.log('IS CALLED');
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



module.exports = app;
