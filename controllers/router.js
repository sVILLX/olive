"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');
const postsRouter = require('../routes/posts');
const commentsRouter = require('../routes/comments');
const usersRouter = require('../routes/users');

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));

module.exports = router;