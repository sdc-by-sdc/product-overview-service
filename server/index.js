require('dotenv').config();
const PORT = process.env.PORT;
const URL_BASE = process.env.URL_BASE;
const app = require('./app.js');
const mongoose = require('mongoose');

// connect to database with a little error handling
mongoose.connect(`mongodb://${DATABASE_URL}`);
const db = mongoose.connection;
db.on('error', function(error) {
  console.log('ERROR connecting to database', error);
});
db.once('open', function() {
  console.log('SUCCESS database has been connected to');
});

// proof the server is running
app.listen(PORT, () => {
  console.log(`Product Overview Service is listening at ${URL_BASE} on port ${PORT}`);
});