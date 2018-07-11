// Create an array that holds the string text/value for the buttons
    var gifArr = ['beach','glacier','clouds','snow','sunrise','waterfall','plants','rainbow'];
    function generateButtons(){
        //Delete buttons before adding new movies to remove repeats
        $('#gifButtons').empty();
        //Loop through the Array of Gif terms
        for (var i = 0; i < gifArr.length; i++){
            //Dynamically generate buttons for each item in the array
            var button = $("<button>");
            // Add gif class to our button.
            button.addClass('gif');
            // Add data-name attribute
            button.attr('data-name',gifArr[i]);
            //Provide the button text
            button.text(gifArr[i]);
            //Add bootstrap style class
            button.addClass("btn btn-primary");
            //console.log(button);
            //Add the button to the gifButtons div
            $('#gifButtons').append(button);
            console.log(gifArr);

        }
    }
    function pushText(){
    //On click function that pushes the text from the submit form into the gifArr
    $('#addButton').on('click',function(event){
        event.preventDefault();
        //Grab the input from the text box.
        var gifText = $('#gif-input').val().trim();
        //Only create a button if gifText input is truthy.
        if(gifText){
        // Push the text to the gifArr
        gifArr.push(gifText);
        }
        //Call generateButtons to create the buttons.
        generateButtons();

    });
    }
    function gifDisplay(){
    // When a gifButton is clicked generate 10 gifs changing the URL value
    //Event delegation is used *code was broken before, adding the 'button' for a event listener for propagation see link  https://learn.jquery.com/events/event-delegation/
    // The .on method only loads what is on the page not dynamicly added elements
    $("#gifButtons").on('click', 'button', function(){
            //Store the data-name attribute in variable buttonVal
            var buttonVal = $(this).attr('data-name');
            console.log(this);
            console.log(buttonVal);
            // Create the queryURL based on the buttonVal
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonVal + "&api_key=dc6zaTOxFJmzC&limit=10";
            console.log(queryURL);
            // API Key
            //API AJAX Call 'URL' 'GET'
            $.ajax({
                url: queryURL,
                method: "GET"
            })
            // Promise function, then 
            .then(function(response){
                //Store response in variable
                console.log(response);
                var results = response.data;
                //Loop over results and create Div, rating paragraph, img tags and prepend to gifs div
                for( var i = 0; i < results.length; i++){
                    var gifDiv = $('<div>');
                    var rating = results[i].rating;
                    var title = results[i].title;
                    var p = $('<p>').text("Rating: " + rating);
                    var pt = $('<p>').text("Title: " + title);
                    var gif = $('<img>');
                    gif.addClass('gif');
                    //Adding data state class, and the links for data-still and data-animate values
                    gif.attr('data-state','still');
                    gif.attr('src', results[i].images.fixed_height_still.url);
                    gif.attr('data-still',results[i].images.fixed_height_still.url);
                    gif.attr('data-animate',results[i].images.fixed_height.url);
                    gif.addClass('img-thumbnail');
                    gif.attr('style','width:250px; height:200px');
                    gifDiv.prepend(pt);
                    gifDiv.prepend(p);
                    gifDiv.prepend(gif);
                    gifDiv.addClass('col-3');
                    $('#gifs').prepend(gifDiv);
            }
           
            
        }); 
    });
}
    //On click function to animate and pause the gifs
    function animateGif(){
        $('#gifs').on('click','img',function(){
            //Get the value of the data state and store in variable.
            var state = $(this).attr('data-state');
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still"){
                $(this).attr("src",$(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

        });


    }
    // Call the functions
    generateButtons();
    gifDisplay();
    pushText();
    animateGif();