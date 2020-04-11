$(document).ready(function () {

    $("#animate").hide();

    var gifChoices = ["surprised", "mad", "sad", "flirty", "hmmm"];


    function displayGifs() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=XbZX4OQK9xwpKzmheb9b2bF2LQIlZbR8&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var gifDiv = $("<div>");

            $("#animate").show();

            gifDiv.addClass("gif-div");
            
            for (var i = 0; i < response.data.length; i++) {
                var rating = response.data[i].rating;
                var source = response.data[i].source;
                var gifStill = response.data[i].images.downsized_still.url;
                var gifAnimated = response.data[i].images.downsized_large.url;
               
                if (rating === "g" || rating === "pg") {
                   
                    var displayGifs = $("<img>").attr("src", gifStill);
                    displayGifs.attr("animated", gifAnimated);
                    displayGifs.attr("frozen", gifStill);
                    $("img").attr("data-state", "still");
                   
                    gifDiv.append(displayGifs);
                    $("#gif-view").prepend(gifDiv);
                  
                    var displayRating = $("<p style='text-transform: capitalize;'>").html("Gif rating: " + rating + "<br><a target='_blank' href=" + source + ">Source</a>");
                

                };
            };

            $("img").on("click", function () {
                var state = $(this).attr("data-state");
                var still = $(this).attr("frozen");
                var animate = $(this).attr("animated");

                if (state === "still") {
                    state = "animate";
                    $(this).attr("src", animate);
                    $(this).attr("data-state", state);
                }

                else if (state === "animate") {
                    state = "still";
                    $(this).attr("src", still);
                    $(this).attr("data-state", state);
                };
            });
        });
    };

    $("#add-gif-type").on("click", function (event) {
        event.preventDefault();
        var reactions = $("#gif-input").val().trim();
        $('#gif-input').val("");
        gifChoices.push(reactions);
        renderButtons();
    });

    
    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < gifChoices.length; i++) {
            var a = $("<button class='btn btn-large btn-info'>");
            a.addClass("gif-button");
            a.attr("data-name", gifChoices[i]);
            a.text(gifChoices[i]);
            $("#buttons").append(a);
        };
    };

    $(document).on("click", ".gif-button", displayGifs);

    renderButtons();
});    