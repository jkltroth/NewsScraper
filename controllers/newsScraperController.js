var express = require("express");

// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Import the model (burger.js) to use its database functions.
// var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

// A GET route for scraping
router.get("/scrape", function (req, res) {

    res.send("Scraping...");

    // First, we grab the body of the html with request
    axios.get("https://www.npr.org/sections/news/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        $("div.item-info").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).children("h2.title").children("a").text();
            result.teaser = $(this).children("p.teaser").children("a").text();
            result.link = $(this).children("p.teaser").children("a").attr("href");

            console.log(result);

            // Create a new Article using the `result` object built from scraping
            // db.Article
            //   .create(result)
            //   .then(function (dbArticle) {
            //     // If we were able to successfully scrape and save an Article, send a message to the client
            //     res.send("Scrape Complete");
            //   })
            //   .catch(function (err) {
            //     // If an error occurred, send it to the client
            //     res.json(err);
            //   });
        });
    });
});

// Export routes for server.js to use.
module.exports = router;