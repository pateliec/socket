var socket = io();

socket.on("connect", function(){
    console.log("Connected to server via socket.io");
})

socket.on("message", function(message){
    //console.log(message.text);
    
    $('#chat').val( $('#chat').val() + " " + message.text );
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
