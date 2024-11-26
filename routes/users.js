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
            const user = req.body; // Extraer datos del cuerpo
            console.log("Request received:", user);

            const result = await dataHandler.createUser(user); // Guardar en MongoDB

            res.status(201).json({ message: "User created successfully", id: result._id });
        } catch (error) {
            console.error("Error processing the request:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

router.route('/')
    .get(async (req, res) => {
        let users = await dataHandler.getUsers();
        res.send(users);
    });

router.route('/:id')
    .get((req, res) => {
        let uuid = req.params.id;
        let product = dataHandler.getProductById(uuid);

        if (product != undefined) {
            res.status(200).json(product);
        } else {
            res.status(404)
                .type('text/plain')
                .send(`No product with ID ${uuid} found`);
        }
    });

module.exports = router;