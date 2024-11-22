"use strict;"

const express = require('express');
const router = require('./olive/controllers/router');
const connectDB = require('./db');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(router);

app.use(express.static('app'));
app.use('/views', express.static('views'));

app.listen(port, () => {
  console.log('Running on port ' + port);
});