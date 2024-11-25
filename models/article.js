const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    username: { type: String, required: true },
    date: { type: Date, required: true },
    likes: { type: Number},
    content: { type: String, required: true }
});

module.exports = mongoose.model('posts', articleSchema);
