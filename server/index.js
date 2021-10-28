require('dotenv').config();
const PORT = process.env.PORT;
const URL_BASE = process.env.URL_BASE;
const app = require('./app.js');

// proof the server is running
app.listen(PORT, () => {
  console.log(`Product Overview Service is listening at ${URL_BASE} on port ${PORT}`);
});