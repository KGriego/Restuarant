// Dependencies
var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 7000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

var list = [
  {
    routename: "pablo",
    name: "Pablo",
    email: "picassoPablo@painting.com",
    time: "5:00 AM"
  },
  {
    routeName: "aang",
    name: "Aang",
    email: "airBender@frozen.com",
    time: "9000 years from now since I'm froze."
  },
  {
    routeName: "jackiechan",
    name: "Jackie Chan",
    email: "jungfu@movies.com",
    time: "Now"
  },
  {
    routeName: "winniethepooh",
    name: "Winnie The Pooh",
    email: "sweet@honey.com",
    time: "Anytime"
  }
];

var reservations = [
  {
    routename: "pablo",
    name: "Pablo",
    email: "picassoPablo@painting.com",
    time: "5:00 AM"
  },
  {
    routeName: "aang",
    name: "Aang",
    email: "airBender@frozen.com",
    time: "9000 years from now since I'm froze."
  },
  {
    routeName: "jackiechan",
    name: "Jackie Chan",
    email: "jungfu@movies.com",
    time: "Now"
  },
  {
    routeName: "winniethepooh",
    name: "Winnie The Pooh",
    email: "sweet@honey.com",
    time: "Anytime"
  }
];

var waitingList = [
  {
    routeName: "johnwick",
    name: "John Wick",
    email: "aFukingPuncel@assassin.com",
    time: "Never"
  }
];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/public/css/style.css", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/css/style.css"));
})

// Displays all characters
app.get("/api/list", function(req, res) {
  return res.json(list);
});

app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitingList", function(req, res) {
  return res.json(waitingList);
});

app.get("/api/list/:reservation", function(req, res) {
  var chosen = req.params.reservations;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

app.post("/api/list", function(req, res) {
  var newRes = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();

  console.log("New Row: " + JSON.stringify(newRes));

  list.push(newRes);

  console.log("Length of list: " + list.length)

  if (list.length > 5) {
    console.log("List: " + JSON.stringify(list));
    console.log("Reservations List: " + JSON.stringify(reservations));
    waitingList.push(newRes);
  } else {
    reservations.push(newRes);
    alert("You must wait till a guest leaves");
  }

  res.json(newRes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
