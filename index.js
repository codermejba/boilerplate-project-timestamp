// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

/* A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix unixKey of the input date in milliseconds (as type Number) */
// Route to handle API requests with an optional date parameter
app.get("/api/:date?", function (req, res) {
  // Extract the date parameter from the request URL
  let date = req.params.date;
  let unixKey; // Variable to store Unix timestamp
  let utcdate; // Variable to store UTC date

  // Check if the date parameter is a valid number (Unix timestamp)
  if (!isNaN(date)) {
    unixKey = date; // Assign the date directly to unixKey
    utcdate = new Date(parseInt(date)); // Convert the Unix timestamp to a Date object
  } else {
    // If the date parameter is not a valid number (Unix timestamp)
    unixKey = Date.parse(date); // Attempt to parse the date string
    if (!isNaN(unixKey)) {
      // If parsing was successful
      utcdate = new Date(parseInt(unixKey)); // Convert the parsed date to a Date object
    } else {
      // If parsing failed
      if (date === undefined) {
        // If no date parameter is provided, use the current timestamp
        unixKey = Date.now(); // Get the current Unix timestamp
        utcdate = new Date(unixKey); // Convert the current timestamp to a Date object
      } else {
        // If the provided date parameter is invalid
        res.json({ error: "Invalid Date" }); // Send an error response
      }
    }
  }

  // Send the response with Unix timestamp and UTC date
  res.json({
    unix: unixKey, // Unix timestamp
    utc: utcdate.toUTCString(), // UTC date string
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
