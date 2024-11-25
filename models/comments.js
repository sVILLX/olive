const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    username: { type: String, required: true },
    date: { type: Date, required: true },
    idArticle: { type: String, required: true},
    content: { type: String, required: true }
});

module.exports = mongoose.model('comments', commentsSchema);
