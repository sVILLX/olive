const Article = require('../models/article'); // Ruta al modelo
const Comment = require('../models/comments');
const User = require('../models/users');

async function postArticle(articleData) {
    try {
        const article = new Article(articleData); // Crear instancia del modelo
        const savedArticle = await article.save(); // Guardar en MongoDB
        return savedArticle;
    } catch (error) {
        console.error("Error saving article:", error);
        throw error; // Lanza el error para manejarlo en el controlador
    }
}

async function getMostLiked() {
    try {
        const articles = await Article.find().sort({likes: -1});
        return articles;
    } catch (error) {
        console.log(error);
    }
}

async function postComment(commentData) {
    try {
        const comment = new Comment(commentData); // Crear instancia del modelo
        const savedComment = await comment.save(); // Guardar en MongoDB
        return savedComment;
    } catch (error) {
        console.error("Error saving comment:", error);
        throw error; // Lanza el error para manejarlo en el controlador
    }
}

async function getComments(articleId) {
    try {
        const comments = await Comment.find({idArticle: {$eq: articleId}});
        return comments;
    } catch (error) {
        console.log(error);
    }
}

async function createUser(userData) {
    try {
        const user = new User(userData);
        const savedUser = await user.save();
        return savedUser
    } catch (error) {
        console.error("Error saving comment:", error);
        throw error; // Lanza el error para manejarlo en el controlador
    }
}

async function getUsers() {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
    }
}

exports.postArticle = postArticle;
exports.getMostLiked = getMostLiked;
exports.postComment = postComment;
exports.getComments = getComments;
exports.createUser = createUser;
exports.getUsers = getUsers;

// module.exports = { postArticle };
// module.exports = { getMostLiked };