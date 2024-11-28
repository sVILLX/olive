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
    .get(async (req, res) => {
        let id = req.params.id;
        let user = await dataHandler.getUserById(id);

        res.send(user);
    });

router.route('/auth')
    .get(async (req, res) => {
        let email = req.query.email;
        let password = req.query.password;
        let user = await dataHandler.authUser(email, password);

        res.send(user);
    });

module.exports = router;