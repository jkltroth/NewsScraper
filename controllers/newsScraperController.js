var express = require("express");

// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// const axios = require("axios");
const request = require("request");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

var router = express.Router();

const scrapedObject = {
    articles: []
};

router.get("/", function (req, res) {

    res.render("index", scrapedObject);
});

// A GET route for scraping
router.get("/scrape", function (req, res) {

    // res.send("Scraping...");

    scrapedObject.articles = [];

    // First, we grab the body of the html with request
    request("https://www.npr.org/sections/news/", function (error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);

        // Now, we grab every h2 within an article tag, and do the following:
        $("div.item-info").each(function (i, element) {

            // Add the text and href of every link, and save them as properties of the result object
            const title = $(element).children("h2.title").children("a").text();
            const teaser = $(element).children("p.teaser").children("a").text();
            const link = $(element).children("p.teaser").children("a").attr("href");

            scrapedObject.articles.push({
                title: title,
                teaser: teaser,
                link: link
            });
        });

        console.log(scrapedObject.articles);
        // res.json(handlebarsObject);
        // res.render("index", handlebarsObject);
        res.redirect("/");
    });
});

router.get("/saved", function (req, res) {
   
    db.SavedArticle
    .find({})
    .then(function (dbSavedArticle) {
      // If any Articles are found, send them to the client
      res.json(dbSavedArticle);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

router.post("/saved", function (req, res) {

    console.log(req.body);

    db.SavedArticle.create(req.body)
        .then(function (dbSavedArticle) {
            res.send("Article Saved")
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Export routes for server.js to use.
module.exports = router;