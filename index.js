var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var port = 3000;
var path = require("path");
var requests = require("./data/requests.json");

function updateRequestdb(req) {
  var unique = requests.find(function(request) {
    return req === request.key;
  });
  !unique && requests.push({
    key: req
  })
}

function checkQuery(query) {
  var regexp = new RegExp("^" + query, "i");
  return requests.filter(function(value) {
    return regexp.test(value.key);
  })
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/assets", express.static(__dirname + "/assets"));
app.use("/ajax", express.static(__dirname + "/ajax"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/search", function(req, res) {
  var key = req.body.key;
  var relevant = key ? checkQuery(key) : [];
  key && updateRequestdb(req.body.key);
  res.json(relevant);
});

app.listen(port, function() {
  console.log("Server is running " + port)
});