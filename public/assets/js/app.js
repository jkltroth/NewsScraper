// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // When you click the scrape button
    $(document).on("click", "#scrapeBtn", function () {

        // Now make an ajax call for to scrape the news site
        $.ajax({
                method: "GET",
                url: "/scrape"
            }) // With that done, reload the page
            .done(function (data) {

                location.reload();

            });
    });

    $(document).on("click", ".savedArticleBtn", function () {

        console.log("clicked!")

        const savedArticle = {
            title: $(this).siblings("a.titleLink").text(),
            teaser: $(this).parent().siblings("p.teaser").text(),
            link: $(this).siblings("a.titleLink").attr("href")
        };

        console.log(savedArticle);
        
        $.ajax({
            method: "POST",
            data: savedArticle,
            url: "/saved"
        }).done(function() {

            console.log("Article saved!");
            // location.reload();

        });
    });
});