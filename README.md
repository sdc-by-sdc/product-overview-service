# product-overview-service
The service intended to handle all traffic for Product Overview

CURRENTLY A WORK IN PROGRESS

How to set up for your own use:

1) Clone the repo from Github and open in the text editor of your choice.
2) Run npm install to get all the needed dependencies.
3) Create a .env file. Using the template from dotenvSAMPLE.js, fill in the .env file with the needed constants.
4) Run npm test to ensure everything is functioning correctly.
5) Run npm start to start the server.
6) ETL the database by uncommenting one of the import functions in app.js at a time and running the server. Let it run until you get the success message, and then stop the server. Repeat with each function, one at a time, and in order.
