var PORT = process.env.PORT || 3000;

var express = require("express");

var moment = require("moment");

var now = moment();

var app = express();

var clientInfo = {};

var http = require("http").Server(app);

var io = require("socket.io")(http);

function getAllUsers(socket)
{
    var users = [];
    var info = clientInfo[socket.id];
    
    if(typeof info === "undefined")
        return;
    
    Object.keys(clientInfo).forEach(function(socketId){
         userInfo = clientInfo[socketId];
        if(info.room === userInfo.room)
            {
               users.push(userInfo.name) ;
            } 
    });
    
    socket.emit("message",{
            name:"Syatem",
            text:users.join(","),
            timestamp:moment.valueOf()
        });
}

io.on("connection", function(socket){
    console.log("Client connected via socket");
    
socket.on("disconnect", function(){
    if(typeof clientInfo[socket.id] !== "undefined")
        {
            var userData = clientInfo[socket.id];
            socket.leave(userData.room);

            socket.broadcast.to(userData.room).emit("message", {
                name:"System",
                text:userData.name + " has left!",
                timestamp: moment.valueOf()
            });
        }
    delete clientInfo[socket.id];
})
    
socket.on("joinRoom", function(req){
    clientInfo[socket.id] = req;
    socket.join(req.room);
    
    socket.broadcast.to(req.room).emit("message", {
        name:"System",
        text:req.name + " has joined!",
        timestamp: moment.valueOf()
    });
})
    
 socket.on("message",function(message){
     //socket.broadcast.emit("message", message);
     
     if(message.text === "@showAllUsers")
         {
             getAllUsers(socket);
         }
     else
         {
             message.timstamp = now.valueOf();
             io.to(clientInfo[socket.id].room).emit("message", message);
         }
 });
    
    
    socket.emit("message",{
        text : "Hi There!",
        timstamp : now.valueOf(),
        name:"System"
    });
    
});

app.use(express.static(__dirname + "/public"));

http.listen(PORT, function(){
    console.log("Server Started ap port:"+PORT)
})