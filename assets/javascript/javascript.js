var config = {
    apiKey: "AIzaSyCNzJvsSZ7iguPl4PhGNcgU75ulM4kli2s",
    authDomain: "project1-bands.firebaseapp.com",
    databaseURL: "https://project1-bands.firebaseio.com",
    projectId: "project1-bands",
    storageBucket: "",
    messagingSenderId: "1002422839035"
  };
  firebase.initializeApp(config); 

  var database = firebase.database();
 
 
 
 // Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "", 
    messagingSenderId: "", 
  };
  
  
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();
 
 
 
 ////////////////////////////////////////////////
 //This is for the first API
 //Use data stored in Firebase to create the queryURL

 // Create the queryURL based on the information form the form
 queryURL = "";
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

    //Use the JSON response results to dynamically update the page.




 });
    ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////
 //This is for the second API
 //Use data stored in Firebase to create the queryURL

 // Create the queryURL based on the information form the form
 queryURL = "";
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

    //Use the JSON response results to dynamically update the page.




 });
    ////////////////////////////////////////////////////////////////

//Write a function that takes response as it parameter to updating and creating repeating elements on the page
function generateInfo(){
    // We will run this function inside the API promise

}

//Initialize Variables
var artistName = '';
var location = '';
//On click function to get form data
 // Capture Button Click
 $("#submit-id").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    artistName= $("#artist-name").val().trim();
    location = $("#location").val().trim();
    console.log(location);
    console.log(artistName);
    // Code for "Setting values in the database"
    database.ref().push({
      artistName: artistName,
      location: location,
    });

    //Clear form text fields
    $("#artist-name").val('');
    $("#location").val('');
  });


  //User Authentication with Firebase Using Google, Github, and Twitter. 
  function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                document.write('Welcome '+ user.displayName);
                console.log(user)
            })
            .catch(console.log);

}