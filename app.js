const express = require("express");
const logger = require("morgan");
const Recipe = require('./models/Recipe.model.js');

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
// app.js
//...

const MONGODB_URI = "mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/express-mongoose-recipes-dev";

mongoose.connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));

// ...



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {
    // 1. Leer toda la información 
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;

    Recipe.create({
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
    }).then((createdRecipe) => {
        res.status(201).json(createdRecipe);
    }).catch((err) => {
        res.status(500).json({
            message: "Error creating new recipe: " + err.message
        })
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes);
    }

    catch (err) {
        // Status code: 500 (Internal Server Error) in case of an error.
        res.status(500).send(err.message);
    }



});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
