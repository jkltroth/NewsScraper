
// When you click the savenote button
$(document).on("click", "#scrapeBtn", function() {

        // Now make an ajax call for to scrape the news site
        $.ajax({
                method: "GET",
                url: "/scrape"
            }) // With that done, add the note information to the page
            .done(function (data) {
                // console.log(data);
                location.reload();
                
            });
    });
