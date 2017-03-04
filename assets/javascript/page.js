window.onload = function() {


    var gifButtons = [                  //<--predefined array of terms used to create buttons
        "Whale", "Dolphin", "Seal", "Star Fish", "Shark", "Patrick", "Sponge Bob"
    ];

    function buttonBuild() {            //<--- buttonBuild begins on page load and createts buttons from predefined giffButton array
        $("#gifButtons").empty();       // buttonBuild will also be called again when user adds to the array
        for (var i = 0; i < gifButtons.length; i++) {
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-name", gifButtons[i]);
            a.attr("type", "button")
            a.text(gifButtons[i]);
            $("#gifButtons").append(a);
        };

        $("button").on("click", function() {        //<-- click event wating for user to click on one of the predefined buttons or
            event.preventDefault();                 // user added buttons. Once button is clicked data from the button is used in the
            $("#displayGifs").empty();              // api query to seach for the animal associated with the button
            var animal = $(this).attr("data-name");
            // console.log(animal);
            var rating = "";
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({                                //<-- ajax call to giphy to return 10 gifs defined by the button clicked 
                    url: queryURL,
                    method: "GET"
                })
                .done(function(response) {         //<--once objects are retuned from giphy divs are dynamically built to display
                    var results = response.data;    // gifs in their still state
                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div class='col-md-8'>");
                        var rating = results[i].rating;
                        // console.log(rating);
                        var p = $("<p>").text("Rating: " + rating);
                        // console.log(p);
                        var animalImage = $("<img>");
                        // console.log(animalImage);
                        animalImage.attr("src", results[i].images.fixed_height_still.url);
                        // console.log(results[i].images.fixed_height.url);
                        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-animate", results[i].images.fixed_height.url)
                        animalImage.attr("data-state", "still");
                        gifDiv.prepend(p);
                        gifDiv.prepend(animalImage);
                        // console.log(gifDiv);
                        $("#displayGifs").prepend(gifDiv);
                    }

                    $("img").on("click", function() {       //<--click event to change the click image state to animate and back to
                        event.preventDefault();             // still if click again
                        var state = $(this).attr("data-state")
                        // console.log(state);
                        if (state == "still") {
                            var animate = $(this).attr("data-animate");
                            // console.log(animate);
                            $(this).attr("data-state", "animate");
                            $(this).attr("src", animate);
                        } else {
                            var still = $(this).attr("data-still");
                            // console.log(still);
                            $(this).attr("data-state", "still");
                            $(this).attr("src", still);
                        }
                    });
                });
        });
    };

    $("#addUserInput").on("click", function() {             //<--takes value enterd by user and addes to gifButtons array
        event.preventDefault();
        var userAnimal = $("#userInput").val().trim();
        gifButtons.push(userAnimal);
        buttonBuild();
    });

    buttonBuild();                                          //<--on window load buttonBuild function is called to build buttons
}
