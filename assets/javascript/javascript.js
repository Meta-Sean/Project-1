var config = {
  apiKey: "AIzaSyCNzJvsSZ7iguPl4PhGNcgU75ulM4kli2s",
  authDomain: "project1-bands.firebaseapp.com",
  databaseURL: "https://project1-bands.firebaseio.com",
  projectId: "project1-bands",
  storageBucket: "project1-bands.appspot.com",
  messagingSenderId: "1002422839035"
};
firebase.initializeApp(config); 

var database = firebase.database();
//moment js
moment().format();
//Bands In Town API Function for grabing artist information
function bandsInTownArtist(artist){
    // Querying the bandsintown api for the selected artist
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    // Printing the entire object to console
      console.log(response)
      var results = response;

      //Run generateContent
      generateArtistContent(results);
     
    });
    
}
//Function to dynamically generate artist information on the page.
function generateArtistContent(results){
   // Constructing HTML containing the artist information
   var artistName = $("<h1>").text(results.name);
   var artistURL = $("<a>").attr("href", results.url).append(artistName);
   var artistImage = $("<img>").attr("src", results.thumb_url);
   var trackerCount = $("<h2>").text(results.tracker_count + " fans tracking this artist");
   var upcomingEvents = $("<h2>").text(results.upcoming_event_count + " upcoming events");
  
  


   // Empty the contents of the artist-div, append the new artist content
   $("#info").empty();
   $("#info").append(artistURL, artistImage, trackerCount, upcomingEvents);

}     


//Bands In Town API Function for grabing artist tour information
function bandsInTownTour(artist){
  // Querying the bandsintown api for the selected artist
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  // Printing the entire object to console
    console.log(response)
    var results = response;
    generateTourContent(results);

  });
}
//Initalize location cordinates
var longitude = -0.120850;
var latitude = 51.508742;
function generateTourContent(results){
    $('#table').empty();
    // Store the coordinates of the first array
    longitude = (results[0].venue.longitude);
    latitude = (results[0].venue.latitude);

    //Loop over the arrays in the object and generate rows of data from each array.
    for(let i =0; i < results.length; i++){
      // Create row for each array
      var newRow = $('<tr>');
      //Create button to link to tickets
      var tickets = "'"+ results[i].offers[0].url  + "'";
      var button = $('<button>');
        button.attr('onclick','window.location.href='+tickets)
        button.addClass("btn btn-outline-primary fas fa-ticket-alt");
      
       //Append the form submition and results to table.
      $(newRow).append('<td>' + moment(results[i].datetime).format('MMM DD') + '</td>')
      $(newRow).append('<td>' + results[i].venue.name + '</td>')
      $(newRow).append('<td>' + results[i].lineup + '</td>')
      $(newRow).append(button) 
      
      $('#table').append(newRow);
      
    }
    myMap();
}
 //Wrapped our submit buton in a function
function submitButton(){ 
//Event handler for user clicking the search button and storing the values
$('#submit-id').on('click', function(event){
    event.preventDefault();

    //Store the arist and location variables
    var artist = $('#artist-name').val().trim();
    
    console.log(artist);
    console.log(location);

    //Store the values in firebase  
    database.ref().push({
      artist: artist,
    });
    //Clear the text field on the form
 


    bandsInTownArtist(artist);
    bandsInTownTour(artist);

    //var artist = $('#artist-name').val()
    queryURL = "https://www.googleapis.com/youtube/v3/search?q=" + artist + "&part=snippet&key=AIzaSyBXz0xMTnmOyG3IfRcOoH10y1pm4r_qd2E&type=video&videoLicense=youtube&videoEmbeddable=true&videoSyndicated=true&safeSearch=moderate&regionCode=US";

    console.log(queryURL);
    
$.ajax({
    url: queryURL,
    method: "GET"
})
  .then(function(response){
    console.log(response);
    var results = response.items[0];
    onYouTubeIframeAPIReady(results);
    $("#artist-name").val('');

});
});
}

submitButton();
//Create array of random artists 
var randArtists = ['post malone','justin timberlake','taylor swift','ed sheeran','beyonce','bruno mars','sam smith','luke bryan','U2','Maroon 5','Noah Cyrus','Elton John'];
 //Wrapped our random buton in a function
 function randomButton(){ 
  //Event handler for user clicking the search button and storing the values
  $('#random').on('click', function(event){
      event.preventDefault();
      //Use math.floor and math.random to pick a random artist in the array
      var randArtistNum = Math.floor(Math.random()*12)+1;
      var artist = randArtists[randArtistNum];
      console.log(artist);
      //Store the values in firebase  
      database.ref().push({
        artist: artist,
      });

      bandsInTownArtist(artist);
      bandsInTownTour(artist);
  });
  }

randomButton();


function myMap() {

    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(latitude,longitude),
      
    });

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude,longitude),
      map: map,
      title: 'On Tour',
    });
    console.log(latitude);
      console.log(longitude);
  }


 
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;


  function onYouTubeIframeAPIReady(video) {

    var py = document.getElementById('player');
    
    console.log(video)

    
    if(py.src){

        // This means you already have an iframe        
        player.loadVideoById(video.id.videoId);

    } else {

      player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: video.id.videoId,
      });
      

    }


    

  }

// $('#submit-id').on('click', function(event){
// event.preventDefault();
// var artist = $('#artist-name').val()
// queryURL = "https://www.googleapis.com/youtube/v3/search?q=" + artist + "&part=snippet&key=AIzaSyBXz0xMTnmOyG3IfRcOoH10y1pm4r_qd2E";
// console.log(queryURL);

// $.ajax({
//     url: queryURL,
//     method: "GET"
// })
//   .then(function(response){
//     console.log(response);
//     var results = response.items[0];
//     onYouTubeIframeAPIReady(results);

// });
// });
