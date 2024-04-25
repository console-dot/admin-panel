const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const cors = require('cors');

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send({ status: 200, message: "Hello", data: null });
});

const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
    .then(() => {
        console.log("\x1b[32m", "Database Connected"); // Green color for success message
        app.listen(process.env.PORT || 3000, () => {
            console.log("\x1b[36m", `Server is running on port ${process.env.PORT || 3000}`); // Cyan color for server running message
        });
    })
    .catch(err => {
        console.error("\x1b[31m", "Error connecting to database:", err); // Red color for error message
    });