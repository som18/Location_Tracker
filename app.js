const express = require('express');
const app = express();
const path = require("path");

const http = require("http");
app.use(express.static('public'));

const socketio = require("socket.io");
const server= http.createServer(app);
const io = socketio(server);



app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id: socket.id, ...data});
    });

    socket.on("disconnect",function(){
        io.emit("user-disconneted",socket.id)
    })
    
});
app .get("/",function(req,res){
    res.render("index");
})

server.listen(3000,()=>{
    console.log('Server is running on port 3000')
});