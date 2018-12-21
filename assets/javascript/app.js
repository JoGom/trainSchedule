$(document).ready(function(){

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBqfb3WNAUSIor6uxUTHvKBPdTk4NrDs2M",
    authDomain: "unit-7-hw.firebaseapp.com",
    databaseURL: "https://unit-7-hw.firebaseio.com",
    projectId: "unit-7-hw",
    storageBucket: "unit-7-hw.appspot.com",
    messagingSenderId: "395849650325"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var inputObj = {};

  //button for adding more items to the table and database
  $("#add-btn").on("click", function(event){
    event.preventDefault();
    getInput();
  });



  function getInput(){
    var trainNameIn = $("#train-input").val().trim();
    var destinationIn= $("#destination-input").val().trim();
    var firstTrainIn = moment($("#time-input").val().trim(), "HH:mm").format("H:mm");
    var frequencyIn = $("#frequency-input").val().trim();

    inputObj = {
        trainName: trainNameIn,
        destination: destinationIn,
        firstTrain: firstTrainIn,
        frequency: frequencyIn
    };
    database.ref().push(inputObj);
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
    console.log(inputObj.trainName);
    console.log(inputObj.destination);
    console.log(inputObj.firstTrain);
    console.log(inputObj.frequency);
  }


});




