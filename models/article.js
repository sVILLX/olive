const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    likes: { type: Number},
    title: { type: String, required: true},
    content: { type: String, required: true }
});

module.exports = mongoose.model('posts', articleSchema);
