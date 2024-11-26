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

router.route('/')
    .get(async (req, res) => {
        try {
            let subarreglo = [];
            const articulos = await dataHandler.getMostLiked(); // Obtener todos los artículos
            const pag = parseInt(req.query.pag) || 1; // Página solicitada, por defecto 1
            const itemsPorPagina = 8; // Número de artículos por página

            // Cálculo del rango
            const inicio = (pag - 1) * itemsPorPagina;
            const fin = Math.min(inicio + itemsPorPagina, articulos.length); // Evitar índices fuera de rango

            // Llenar el subarreglo con artículos de la página actual
            subarreglo = articulos.slice(inicio, fin);

            // Cálculo del número total de páginas
            const totalArticulos = articulos.length;
            const pages_count = Math.ceil(totalArticulos / itemsPorPagina);

            // Respuesta
            const data = [
                subarreglo, // Artículos de la página actual
                pages_count // Número total de páginas
            ];

            res.status(200).send(data);
        } catch (error) {
            console.error("Error al obtener artículos:", error);
            res.status(500).send({ error: "Error al obtener artículos." });
        }
    });


module.exports = router;