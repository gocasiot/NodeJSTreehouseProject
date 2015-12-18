//Problem: We need a simple way to look at a user's badge count and JavaScript points
//Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
var https = require("https");
var http = require("http");


//Print out message
function printMessage(userName, badgeCount, points) {
  var message = userName + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

//Print out error messages
function printError(error) {
  console.error(error.message);
}

function get(userName) {
  //Connect to the API URL (http://teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + userName + ".json", function(response){
    //console.dir(response.statusCode);
    var body = "";
    //Read the data
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end',function(){
      if(response.statusCode === 200){
        try {
          //Parse the data
          var profile = JSON.parse(body);
          //Print the data
          printMessage(userName, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //Parse error
          printError(error);
        }
      } else {
        //Status Code Error
        printError({message: "There was an error getting the profile for " + userName + ". (" + http.STATUS_CODES[response.statusCode] +")"});
      }
    
    });
  });
//Connection Error
request.on("error",printError);
}

module.exports.get = get;
