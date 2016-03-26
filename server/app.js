var path = require("path");
var express = require("express");


/**
 * Set up the port
 */
var port = process.env.PORT || process.env.NODE_PORT || 3000;


/**
 * Set up express server
 */
var app = express();
app.use("/assets", express.static(path.resolve(__dirname + "/../dist/")));
app.set("view engine", "jade");
app.set("views", path.resolve(__dirname + "/views"));

/** TODO THIS WILL BE MOVED */
app.get("/", function(req, res) {
    res.render("index");
});

app.listen(port, function(err) {
   if (err) {
       console.log("Could not connect to port " + port);
       throw err;
   }
   console.log("listening on port " + port);
});