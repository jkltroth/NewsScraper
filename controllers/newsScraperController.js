var express = require("express");

// Import the model (burger.js) to use its database functions.
// var burger = require("../models/burger.js");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    res.render("index");
});

// Export routes for server.js to use.
module.exports = router;