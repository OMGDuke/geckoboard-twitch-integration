require('dotenv').config();

var API_KEY = process.env.GECKO_API;

var gb = require('geckoboard')(API_KEY);

gb.datasets.findOrCreate(
  {
    id: 'sales.by_day',
    fields: {
      quantity: {
        type: 'number',
        name: 'Number of sales'
      },
      gross: {
        type: 'money',
        name: 'Gross value of sales',
        currency_code: "USD"
      },
      date: {
        type: 'date',
        name: 'Date'
      }
    }
  },
  function (err, dataset) {
    if (err) {
      console.error(err);
      return;
    }

    dataset.put(
      [
        { date: '2016-01-01', quantity: 819, gross: 2457000 },
        { date: '2016-01-02', quantity: 409, gross: 1227000 },
        { date: '2016-01-03', quantity: 164, gross: 492000 }
      ],
      function (err) {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Dataset created and data added');
      }
    );
  }
);
