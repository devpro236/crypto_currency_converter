const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/', (req, res) => {
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let amount = req.body.amount;
  let baseUrl = 'https://apiv2.bitcoinaverage.com/convert/global';
  let options = {
    url: baseUrl,
    methode: 'GET',
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, (error, response, body) => {
    var data = JSON.parse(body);
    var price = data.price;
    let currentDate = data.time;
    console.log(price);
    res.write('<h1>the current date is ' + currentDate + '</h1>');
    res.write(
      '<h1> ' +
        amount +
        crypto +
        ' is  currently worth ' +
        price +
        fiat +
        '</h1>'
    );

    res.send();
  });
});

app.listen(8000, () => console.log('server running on port 8000'));
