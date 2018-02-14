const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// ------------------- 
// Might be able to remove this section because the dependancies are required in the controller 

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

// ------------------- 

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;

if (process.env.MONGODB_URI){

    mongoose.connect(process.env.MONGODB_URI);
    
} else {

mongoose.connect("mongodb://localhost/newsScraper");

}
// Import routes and give the server access to them.
const routes = require("./controllers/newsScraperController.js");

app.use("/", routes);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  });