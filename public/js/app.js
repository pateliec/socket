var socket = io();

socket.on("connect", function(){
    console.log("Connected to server via socket.io");
})

socket.on("message", function(message){
    //console.log(message.text);
    var timestamp = moment.utc(message.timestamp);
    $('#chat').val( $('#chat').val() + "\n" + timestamp.local().format("h: mm a")+ ": " + message.text );
})

$("document").ready(function(){
        $("#submit").click(function(){
        socket.emit("message", {
            text: $("#message").val()
        });

        $("#message").val('');
        $("#message").focus();
    })
})
