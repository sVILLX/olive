const Article = require('../models/article'); // Ruta al modelo

async function postArticle(articleData) {
    try {
        const article = new Article(articleData); // Crear instancia del modelo
        const savedArticle = await article.save(); // Guardar en MongoDB
        console.log("Article saved:", savedArticle);
        return savedArticle;
    } catch (error) {
        console.error("Error saving article:", error);
        throw error; // Lanza el error para manejarlo en el controlador
    }
}

async function getMostLiked() {
    try {
        const articles = await Article.find().sort({likes: -1});
        console.log(articles);
        return articles;
    } catch (error) {
        console.log(error);
    }
}

exports.postArticle = postArticle;
exports.getMostLiked = getMostLiked;

// module.exports = { postArticle };
// module.exports = { getMostLiked };