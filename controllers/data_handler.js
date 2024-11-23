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

module.exports = { postArticle };
