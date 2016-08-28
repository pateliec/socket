var PORT = process.env.PORT || 3000;

var express = require("express");

var moment = require("moment");

var now = moment();

var app = express();

var http = require("http").Server(app);

var io = require("socket.io")(http);

io.on("connection", function(socket){
    console.log("Client connected via socket");
    
 socket.on("message",function(message){
     console.log("Message Received:"+message.text);
     //socket.broadcast.emit("message", message);
     message.timstamp = now.valueOf();
     io.emit("message", message);
 })
    
    
    socket.emit("message",{
        text : "Hi There!",
        timstamp : now.valueOf()
    })
    
})

app.use(express.static(__dirname + "/public"));

http.listen(PORT, function(){
    console.log("Server Started ap port:"+PORT)
})