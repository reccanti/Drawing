/* global io */

var socket;

function connectToSocket(callback) {
    //countField = document.getElementById("count");
    
    socket = io.connect(); 
    
    //console.log("emitting...");
    socket.emit("toServer", {});
    
    socket.on("toClient", function() {
        //console.log("hello, world");
    });
    
    // var submitButton = document.getElementsByName("input")[0];
    // var xPos = document.getElementsByName("xPos")[0];
    // var yPos = document.getElementsByName("yPos")[0];
    // submitButton.addEventListener("click", function() {
    //     var x = xPos.value;
    //     var y = yPos.value;
    //     var imgData = {
    //         x: x,
    //         y: y,
    //         client: id,
    //         timestamp: moment().format()
    //     }
    //     socket.emit("addToStack", imgData);
    // });
    
    // receiveUserId(socket);
    // drawOnCanvas(socket);
    callback(socket);
}


export {connectToSocket};