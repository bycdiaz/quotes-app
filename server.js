require('dotenv').config();

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const connectionString = process.env.DB_URI;

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
  const db = client.db('quotesapp');
  const quotesCollection = db.collection('quotes');

  try {
    app.listen(3000, function() {
      console.log('listening on 3000');
    });

    console.log('Connected to Database!');

    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results });
        })
        .catch(error => console.error(error));
    });

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          console.log(result);
          res.redirect('/');
        })
        .catch(error => console.error(error))
    });
  } catch (error) {
    console.error(err);
  }
})
