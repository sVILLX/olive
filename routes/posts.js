"use strict;"

const router = require('express').Router();
const dataHandler = require('../controllers/data_handler');
const cors = require('cors');

router.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));

router.route('/')
.post(async (req, res) => {
        try {
            const article = req.body; // Extraer datos del cuerpo
            console.log("Request received:", article);

            const result = await dataHandler.postArticle(article); // Guardar en MongoDB

            res.status(201).json({ message: "Article created successfully", id: result._id });
        } catch (error) {
            console.error("Error processing the request:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

module.exports = router;