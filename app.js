const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));




// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
app.post("/recipes", (req, res, next) => {
    const newRecipe = req.body

    Recipe.create(newRecipe)
        .then((recipe) => {
            res.status(201).json(recipe)
        })
        .catch((err) => {
            console.log("Error posting the new Recipe", err);
            res.status(500).json({ error: "Error adding the new Recipe" })
        })
})

//  Iteration 4 - Get All Recipes
app.get("/recipes", (req, res) => {

  Recipe.find()
    .then((recipe) => {
      res.status(200).json(recipe)
    })
    .catch((err) => {
      console.log("Error getting Recipes", err);
      res.status(500).json({ error: "Error getting Recipes" })
    })

});


//  Iteration 5 - Get a Single Recipe
app.get("/recipes/:recipeId",(req,res) => {

    const {recipeId} = req.params

    Recipe.findById(recipeId)
    .then((recipe)=>{
        res.status(200).json(recipe)
    })
    .catch((err)=>{
        console.log("Error getting the recipeId",err);
        res.status(500).json({error:"Error getting the recipe By ID"})
    })

}) 


//  Iteration 6 - Update a Single Recipe
app.put(`/recipes/:recipeId`, (req, res, next) => {
  const { recipeId } = req.params
  const newrRecipe = req.body

  Recipe.findByIdAndUpdate(recipeId, newrRecipe, { new: true })
    .then((recipe) => {
      res.json(recipe)
    })
    .catch((err) => {
      console.log("Error updating recipe ID from DB", err)
      res.status(500).json({ error: "Error updating recipe ID from DB" })
    })
})


//  Iteration 7 - Delete a Single Recipe
app.delete(`/recipes/:recipeId`, (req, res, next) => {
  const { recipeId } = req.params

  Recipe.findByIdAndDelete(recipeId)
    .then((recipe) => {
      res.json(recipe)
    })
    .catch((err) => {
      console.log("Error deleting recipe ID from DB", err)
      res.status(500).json({ error: "Error deleting recipe ID from DB" })
    })
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
