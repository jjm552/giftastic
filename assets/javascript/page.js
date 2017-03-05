window.onload = function() {


    var gifButtons = [
        "Whale", "Dolphin", "Seal", "Star Fish", "Shark", "Patrick", "Sponge Bob"
    ];

    function buttonBuild() {
        $("#gifButtons").empty();
        for (var i = 0; i < gifButtons.length; i++) {
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-name", gifButtons[i]);
            a.attr("type", "button")
            a.text(gifButtons[i]);
            $("#gifButtons").append(a);
        };

        $("button").on("click", function() {
            event.preventDefault();
            $("#displayGifs").empty();
            var animal = $(this).attr("data-name");
            // console.log(animal);
            var rating = "";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .done(function(response) {
                    var results = response.data;
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

                    $("img").on("click", function() {
                        event.preventDefault();
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

    $("#addUserInput").on("click", function() {
        event.preventDefault();
        var userAnimal = $("#userInput").val().trim();
        gifButtons.push(userAnimal);
        buttonBuild();
    });

    buttonBuild();
}
