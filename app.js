require('dotenv').config();

var API_KEY = process.env.GECKO_API;

var gb = require('geckoboard')(API_KEY);

gb.ping(function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Authentication successful');
});
