"use strict;"

const express = require('express');
const router = require('./controllers/router');
const connectDB = require('./db');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use(express.static('olive'));
app.use(express.static('views'));

app.use(router);

app.listen(port, () => {
  console.log('Running on port ' + port);
});