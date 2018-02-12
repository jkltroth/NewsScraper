var express = require("express");

// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// const axios = require("axios");
const request = require("request");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

var router = express.Router();

const scrapedArticlesObject = {
    scrapedArticles: []
};

router.get("/", function (req, res) {

    res.render("index", scrapedArticlesObject);
});

// A GET route for scraping
router.get("/scrape", function (req, res) {

    // res.send("Scraping...");

    scrapedArticlesObject.scrapedArticles = [];

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

            scrapedArticlesObject.scrapedArticles.push({
                title: title,
                teaser: teaser,
                link: link
            });
        });

        console.log(scrapedArticlesObject.scrapedArticles);
        // res.json(handlebarsObject);
        // res.render("index", handlebarsObject);
        res.redirect("/");
    });
});

// A GET route for rendering the Saved Article collection
router.get("/saved", function (req, res) {

    db.SavedArticle
        .find({})
        .then(function (dbSavedArticle) {

            const savedArticlesObject = {
                savedArticles: dbSavedArticle
            };

            // If any Articles are found, send them to the client
            res.render("saved", savedArticlesObject);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});

// A POST route for posting articles to the SavedArticle collection
router.post("/saved", function (req, res) {

    db.SavedArticle.create(req.body)
        .then(function (dbSavedArticle) {
            res.send("Article Saved")
        })
        .catch(function (err) {
            res.json(err);
        });
});

// A DELETE route for deleting articles from the SavedArticle collection
router.delete("/delete/:id", function (req, res) {

    db.SavedArticle.remove({
            "_id": req.params.id
        })
        .then(function (dbSavedArticle) {
            res.send("Article Deleted");
        })
        .catch(function (err) {
            res.json(err);
        });

});





// Export routes for server.js to use.
module.exports = router;