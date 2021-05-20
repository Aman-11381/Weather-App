// adding express module to the project and storing it in the express variable
const express = require("express");
// adding https inbuilt module to the project to make https requests to the api endpoint
const https = require("https");
// adding body parser to parse the data sent to the server by the form
const bodyParser = require("body-parser");

const app = express();

// initializing the body-parser with the required properties
app.use(bodyParser.urlencoded({extended: true}));

// adding a get method to the server homepage
app.get("/", function(req, res){
  // sending a file names index.html upon landing on homepage
  res.sendFile(__dirname + "/index.html");
});

// adding a post method to the homepage....this is where the post request is send by the form in index.html
app.post("/", function(req, res){
  // storing the cityname given as input by the user in a variable
  const query = req.body.cityName;
  // this stores the api key given by the api to us fpr authentication purpose
  const apiKey = "9cfc5a8a91d7762f67c66b0ccc03c2f8";

  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  // making http request to the api for getting the weather data based on the city user entered
  https.get(url, function(response){

    response.on("data", function(data){
      // using the JSON.parse method to convert the sent data from the api from jSON format to js object
      const weatherData = JSON.parse(data);
      // extracting the temperature from the sent data
      const temp = weatherData.main.temp;
      // extracting the weather description from the sent data
      const weatherDesc = weatherData.weather[0].description;
      // extracting the icon code from the sent data
      const iconCode = weatherData.weather[0].icon;
      // url to get the image according to the weather conditions
      const imageUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

      res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>");
      res.write("<p>The weather condition is " + weatherDesc + "</p>");
      res.write('<img src="' + imageUrl + '"alt="weather-icon-img">');
      res.send();
    });
  });
});

app.listen(4000, function(){
  console.log("Server has started on port 4000.");
});
