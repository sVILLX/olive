const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    articleId: { type: String, required: true},
    content: { type: String, required: true }
});

module.exports = mongoose.model('comments', commentsSchema);
