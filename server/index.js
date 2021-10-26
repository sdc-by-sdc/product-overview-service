require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const URL_BASE = process.env.URL_BASE;
const DATABASE_URL = process.env.DATABASE_URL;
const mongoose = require('mongoose');
const { uploadProducts, uploadStyles, uploadFeatures, uploadSKUs, uploadPhotos, uploadRelated } = require('../database/import.js');

// connect to database with a little error handling
mongoose.connect(`mongodb://${DATABASE_URL}`);
const db = mongoose.connection;
db.on('error', function(error) {
  console.log('ERROR connecting to database', error);
});
db.once('open', function() {
  console.log('SUCCESS database has been connected to');
});


// IMPORTING CSV FILES; UN COMMENT ONE AT A TIME IN ORDER
// AND RUN THE SERVER UNTIL FINISHED; APPROX TIMES LISTED

// uploadProducts();        // 5 minutes
//uploadStyles();           // 1 hour
//uploadFeatures();         // 1 hour
//uploadSKUs();             // 3 hours
//uploadPhotos();           // 2 hours
//uploadRelated();          // 1.5 hours


// proof the server is running
app.listen(PORT, () => {
  console.log(`Product Overview Service is listening at ${URL_BASE} on port ${PORT}`);
});