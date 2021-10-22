require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const URL_BASE = process.env.URL_BASE;
const DATABASE_URL = process.env.DATABASE_URL;
const mongoose = require('mongoose');
const uploadProducts = require('../database/import.js');

// connect to database with a little error handling
mongoose.connect(`mongodb://${DATABASE_URL}`);
const db = mongoose.connection;
db.on('error', function() {
  console.log('ERROR connecting to database');
});
db.once('open', function() {
  console.log('SUCCESS database has been connected to');
});

// uploadProducts();

// proof the server is running
app.listen(PORT, () => {
  console.log(`Product Overview Service is listening at ${URL_BASE} on port ${PORT}`);
});