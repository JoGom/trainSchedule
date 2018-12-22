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

  //button for adding more items to the table and database
  $("#add-btn").on("click", function(event){
    event.preventDefault();
    getInput();
  });

  //grabs the values of the current object in the database
  database.ref().on("child_added", function(childSnap) {

    var name = childSnap.val().trainName;
    var destin = childSnap.val().destination;
    var firstT = childSnap.val().firstTrain;
    var freq = childSnap.val().frequency;

    var currentTime = moment().format("hh:mm");
    var minuteSince = Math.abs(moment().diff(moment(firstT, "HH:mm"), "minutes"));
    var num= (parseInt(minuteSince)/parseInt(freq))%1;
    var minsLeft = Math.round(parseInt(freq) - (num*parseInt(freq)));
    var nextArrival = moment().add(minsLeft, 'm').format("h:mm A");
    console.log(minuteSince);
    console.log(currentTime);
    console.log(num);
    console.log(minsLeft);
    console.log(nextArrival);
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destin),
        $("<td>").text(freq),
        $("<td>").text(nextArrival),
        $("<td>").text(minsLeft)
      );
      // Append the new row to the table
      $("#trainTable > tbody").append(newRow);
      
    console.log(name);
    console.log(destin);
    console.log(firstT);
    console.log(freq);

  });

  function getInput(){
    var inputObj = {
        trainName: $("#train-input").val().trim(),
        destination: $("#destination-input").val().trim(),
        firstTrain: moment($("#time-input").val().trim(), "HH:mm").format("HH:mm"),
        frequency: $("#frequency-input").val().trim()
    };

    database.ref().push(inputObj);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

  }

});




