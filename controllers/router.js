"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');
const postsRouter = require('../routes/posts');


router.use('/posts', postsRouter);

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));

module.exports = router;