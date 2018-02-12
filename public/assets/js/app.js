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

        const savedArticle = {
            title: $(this).parent().siblings("div").children("a.titleLink").text(),
            teaser: $(this).parent().siblings("div").children("div").children("p.teaser").text(),
            link: $(this).parent().siblings("div").children("a.titleLink").attr("href")
        };

        console.log(savedArticle);

        $.ajax({
            method: "POST",
            data: savedArticle,
            url: "/saved"
        }).done(function () {

            console.log("Article saved!");
            // location.reload();

        });
    });

    $(document).on("click", ".deleteArticleBtn", function () {

        const thisId = $(this).attr("data-id");

        $.ajax({
            url: "/delete/" + thisId,
            method: "DELETE"
        }).done(function () {

            location.reload();
        });
    });
});