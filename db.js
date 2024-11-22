const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:1T0XSJMoF8Eu579W@myapp.p0soa.mongodb.net/OliveDB";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB using Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Finaliza la aplicación si no se conecta
    }
};

module.exports = connectDB;

