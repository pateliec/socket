var PORT = process.env.PORT || 3000;

var express = require("express");

var app = express();

var http = require("http").Server(app);

var io = require("socket.io")(http);

io.on("connection", function(){
    console.log("Client connected via socket");
})

app.use(express.static(__dirname + "/public"));

http.listen(PORT, function(){
    console.log("Server Started ap port:"+PORT)
})