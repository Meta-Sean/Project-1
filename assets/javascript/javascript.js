var config = {
  apiKey: "AIzaSyAPFwkM7er4XfzBRB9CT2wS52IVIG9ARZI",
  authDomain: "test-91708.firebaseapp.com",
  databaseURL: "https://test-91708.firebaseio.com",
  projectId: "test-91708",
  storageBucket: "test-91708.appspot.com",
  messagingSenderId: "802365238772"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();
//Clear the database on page load
function clearDataBase(){
database.ref().set({
  
});
}
//Run the clear database function once
clearDataBase();
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
var longitude = -96.78451749999999;
var latitude = 32.8412178;
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
      
      var button = $('<button>');
      var tickets = "'"+ results[i].offers[0].url  + "'";
        button.attr('onclick','window.location.href='+tickets)
        button.addClass("btn btn-outline-primary fas fa-ticket-alt");
      
       //Append the form submition and results to table.
      $(newRow).append('<td>' + moment(results[i].datetime).format('MMM DD') + '</td>')
      $(newRow).append('<td>' + results[i].venue.name + '<br>' + results[i].venue.city + '</td>')
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
    $("#artist-name").val('');


    bandsInTownArtist(artist);
    bandsInTownTour(artist);
    getTopTracks(artist);
    youtubeVideo(artist)

});
}
submitButton();
//Create array of random artists 
var randArtists = ['Post Malone','Justin Timberlake','Taylor Swift','Ed Sheeran','Beyonce','Bruno Mars','Eagles','Luke Bryan','U2','Kesha','Noah Cyrus','Elton John'];
 //Wrapped our random buton in a function
 function randomButton(){ 
  //Event handler for user clicking the search button and storing the values
  $('#random').on('click', function(event){
      event.preventDefault();
      //Use math.floor and math.random to pick a random artist in the array
      var randArtistNum = Math.floor(Math.random()*12);
      var artist = randArtists[randArtistNum];
      console.log(artist);
      //Store the values in firebase  
      database.ref().push({
        artist: artist,
      });
     
      bandsInTownArtist(artist);
      bandsInTownTour(artist);
      getTopTracks(artist);
      youtubeVideo(artist);
  });
  }

randomButton();

//Google Maps API function
function myMap() {
    // Variable to set the Map
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(latitude,longitude),
      
    });
    // Variable to set the marker.
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude,longitude),
      map: map,
      title: 'On Tour',
    });
    console.log(latitude);
      console.log(longitude);
  }
  myMap();
//Create Array of keys for each child_added
var keysArray = [];
// Function for storing the keys
database.ref().on("child_added", function(snapshot) {
    var keys = snapshot.key;
    console.log(keys);
    keysArray.push(keys);
    console.log(keysArray);
});
// Past searches function that uses Firebase
database.ref().on("value", function(snapshot) {
  $('#past-search').empty();
  var data = snapshot.val();
  console.log(data);
  console.log(data[keysArray[0]]);
  for (let i = 1; i < 6; i++){
    //Create a list of recently searched artists
  var searchList = $("<ul>");
  console.log(keysArray.length, i);
  $(searchList).prepend("<li>" + data[keysArray[keysArray.length - i]].artist + "</li>");
  $('#past-search').append(searchList);
  }
});

//This function gets the artist's top tracks from the Spotify
function getTopTracks(artist) {
  var token = 'BQC2HHl_fyMAUHiTXzqsHnWe8O6d1U-bStiUNbJxxYQL61XLasxqemhg9SS0R7Tpy5p6w6YAC_WfroKkvQpuIqkeqYlyNLSK0xf94766Tltq-KCOIrRP3ssUQyuFPx5ozdLXEXoUWYyxjCgpxO_cgMr_uV_x_dFQaDGGdT-fb6KzjLO6Z0Ec2UXldMMMLJyz3Kir6jfQNLMpCkDDadSF';
  var artistId = '';
  var endpoint1 = 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist&access_token=' + token;
  var endpoint2 = '';
  $.ajax({
    url: endpoint1,
    method: 'GET'
  }).then(function (response) {
    getTracksData(response, token);
  })
 
  function getTracksData(response, token) {
    var data = response.artists.items[0];
      var artistUri = data.uri;
      artistId = data.id;
      endpoint2 = 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=US&access_token=' + token;
      $.ajax({
        url: endpoint2,
        method: 'GET'
      }).then(function (response) {
        displayTracksData(artistUri);
      });
  }
 
  function displayTracksData(uri) {
    $('#spotify').empty();
    var frame = $('<iframe>');
        frame.attr('src', 'https://open.spotify.com/embed?uri=' + uri);
        frame.attr('width', '300');
        frame.attr('height', '380');
        frame.attr('frameborder', '0');
        frame.attr('allowtransperancy', 'true');
        frame.attr('allow', 'encrypted-media');
        $('#spotify').append(frame);
  }
 }
 function youtubeVideo(artist){
    queryURL = "https://www.googleapis.com/youtube/v3/search?q=" + artist + "&part=snippet&key=AIzaSyBXz0xMTnmOyG3IfRcOoH10y1pm4r_qd2E&type=video&videoLicense=youtube&videoEmbeddable=true&videoSyndicated=true&safeSearch=moderate&regionCode=US";

    console.log(queryURL);
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
      var results = response.items[0];
      console.log
      onYouTubeIframeAPIReady(results);
      

  });
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;


function onYouTubeIframeAPIReady(video) {

  var py = document.getElementById('youtube');
  
  console.log(video)

  
  if(py.src){

      // This means you already have an iframe        
      player.loadVideoById(video.id.videoId);

  } else {

    player = new YT.Player('youtube', {
      height: '390',
      width: '640',
      videoId: video.id.videoId,
      
    });
    console.log(player);
  }

}