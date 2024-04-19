// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let time=new Date('1713535736000')
time=time.getTime()
console.log(time)

/* A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix inputDate of the input date in milliseconds (as type Number) */
/* app.get("/api/:date?", function (req, res) {

  let {date} = req.params;
  let inputDate =new Date(date);
  console.log(inputDate);
  if (isNaN(inputDate)&&date===undefined){
    date=Date.now()
    inputDate =new Date(parseInt(date))
  }
  else{
    res.json({
      error: "Invalid Date"
    })
  }
    res.json({
    unix: date, 
    utc: inputDate.toUTCString()
  }); 
}) */
app.get("/api/:date?", function (req, res) {
  let {date} = req.params;
  let inputDate =new Date(date);
  res.json({
    unix: inputDate.getTime(), 
    utc: inputDate.toUTCString()
  })
})
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
