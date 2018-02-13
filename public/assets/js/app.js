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

    // When you click the Save Article button
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

        });
    });

    // When you click the Delete Article button
    $(document).on("click", ".deleteArticleBtn", function () {

        const thisId = $(this).attr("data-id");

        $.ajax({
            url: "/delete/" + thisId,
            method: "DELETE"
        }).done(function () {

            location.reload();
        });
    });

    // When you click the Article Notes button 
    $(document).on("click", ".articleNotesBtn", function () {

        $(".modal-title").empty();
        $("#bodyInput").val("");
        $(".modal-footer").empty();

        const thisId = $(this).attr("data-id");

        $.ajax({
                method: "GET",
                url: "/saved/" + thisId
            })
            // With that done, add the note information to the page
            .done(function (data) {
                console.log(data)

                //Modal title
                $(".modal-title").prepend("<h4>Notes For Article:" + data._id + "</h4>");
                // A button to submit a new note, with the id of the article saved to it
                $(".modal-footer").append("<a data-id='" + data._id + "' class='saveNoteBtn modal-action modal-close ight waves-effect waves-light btn'>Save Note</a>");

                // If there's a note in the article
                if (data.note) {
                    // Place the body of the note in the body textarea
                    $("#bodyInput").val(data.note.body);
                }

                $('#notesModal').modal();
                $('#notesModal').modal('open');

            });

    });

    // When you click the Save Note button 
    $(document).on("click", ".saveNoteBtn", function () {

        const thisId = $(this).attr("data-id");

        $.ajax({
                method: "POST",
                url: "/saved/" + thisId,
                data: {
                    // Value taken from note textarea
                    body: $("#bodyInput").val()
                }
            })
            // With that done....
            .done(function (data) {
                console.log(data)

                $("#bodyInput").empty();

            });
    });
});