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
            const comment = req.body; // Extraer datos del cuerpo
            console.log("Request received:", comment);

            const result = await dataHandler.postComment(comment); // Guardar en MongoDB

            res.status(201).json({ message: "Comment created successfully", id: result._id });
        } catch (error) {
            console.error("Error processing the request:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

router.route('/')
    .get(async (req, res) => {
        let articleId = req.query.articleId;
        let comments = await dataHandler.getComments(articleId);
        res.send(comments);
    });

module.exports = router;