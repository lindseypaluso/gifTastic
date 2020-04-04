$(document).ready(function() {

    $("#animate-text").hide();
    // Initial array of gifs
    var gifChoices = ["surprised", "mad", "sad", "flirty", "random"];
    
    // Creates AJAX call for the animal button being clicked
    
    // displayGifs function re-renders the HTML to display the appropriate content
    function displayGifs() {
    
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=XbZX4OQK9xwpKzmheb9b2bF2LQIlZbR8&limit=10";
    
    // Creates AJAX call for the animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    // Creates a div to hold the gif
        var gifDiv = $("<div>");
    // Shows the text with click instructions     
        $("#animate-text").show();
    // Adds a class to the gifDiv for css
        gifDiv.addClass("gif-div"); 
    // Retrieves the rating
        for (var i = 0; i < response.data.length; i++) {
        var rating = response.data[i].rating;
        var source = response.data[i].source;
        var gifStill = response.data[i].images.downsized_still.url;
        var gifAnimated = response.data[i].images.downsized_large.url;
        // Filters by rating
            if (rating === "g" || rating === "pg") {
            // Retrieves the gif sources
                var displayGifs = $("<img>").attr("src", gifStill);
                displayGifs.attr("animated", gifAnimated);
                displayGifs.attr("frozen", gifStill); 
                // Adds data state and gif sources
                $("img").attr("data-state", "still");
            // Puts the new gifs above the previous
                gifDiv.append(displayGifs);
                $("#gif-view").prepend(gifDiv);
            // Creates an element to have the rating & source link displayed
                var displayRating = $("<p style='text-transform: capitalize;'>").html("Gif rating: " + rating + "<br><a target='_blank' href=" + source + ">Source</a>");
            // Displays the rating & source
            
            };
        };  

        $("img").on("click", function() {
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

    // This function handles events where the add button is clicked
    $("#add-gif-type").on("click", function(event) {
        event.preventDefault();
    // This line of code will grab the input from the textbox
        var reactions = $("#gif-input").val().trim();
        $('#gif-input').val("");
    // The animal from the textbox is then added to our array
        gifChoices.push(reactions);
    // Calling the function
        renderButtons();
    }); 

    // Function for creating buttons
    function renderButtons() {
        $("#buttons-view").empty();
    // Loops through the array of animals
        for (var i = 0; i < gifChoices.length; i++) {
        // Then dynamically generates buttons for each animal
            var a = $("<button class='btn btn-large btn-danger'>");
        // Adds a class to our button
            a.addClass("gif-button");
        // Adds a data-attribute
            a.attr("data-name", gifChoices[i]);
        // Provides the initial button text
            a.text(gifChoices[i]);
        // Adds the button to the buttons-view div
            $("#buttons-view").append(a);
    };
    };

    // Adding click event listeners to all elements with a class of "gif"
    $(document).on("click", ".gif-button", displayGifs);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();   
});    