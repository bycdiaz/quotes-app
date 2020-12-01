require('dotenv').config();

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.DB_URI;

app.listen(3000, function() {
  console.log('listening on 3000');
});

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
  try {
    console.log('Connected to Database!');
  } catch (error) {
    console.error(err);
  }
})

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
  console.log(req.body);
});
