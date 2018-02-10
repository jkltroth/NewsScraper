
// When you click the scrape button
$(document).on("click", "#scrapeBtn", function() {

        // Now make an ajax call for to scrape the news site
        $.ajax({
                method: "GET",
                url: "/scrape"
            }) // With that done, reload the page
            .done(function (data) {
        
                location.reload();
                
            });
    });
