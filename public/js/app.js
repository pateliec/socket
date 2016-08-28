var name = getParameterByName('name') || "Guest";
var room = getParameterByName('room') || "My Room";
var socket = io();

socket.on("connect", function(){
    console.log("Connected to server via socket.io");

    socket.emit("joinRoom", {
        name:name,
        room:room,
      });
})

socket.on("message", function(message){
    //console.log(message.text);
    
    var timestamp = moment.utc(message.timestamp);
    $('#chat').val( $('#chat').val() + "\n"+ message.name + " " + timestamp.local().format("h: mm a")+ ": " + message.text );
})

$("document").ready(function(){
        $("#submit").click(function(){
        socket.emit("message", {
            text: $("#message").val(),
            name: name
        });

        $("#message").val('');
        $("#message").focus();
    })
})
