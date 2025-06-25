const path=require('path');
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const PORT=4444;


app.set('view engine','hbs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.get('/chat',(req,res)=>{
    res.render('chat');
})

const io = new Server(httpServer);
//creating the pipeline and the server side configuration
io.on("connection", (socket) => {
//   console.log("connection requested by a client");
socket.emit('Welcome',{
    msg:'welcome to our app'
})

socket.on('chat',(msg,cb)=>{
    console.log(msg);
    cb({
        status:"ok"
    })
})
});

httpServer.listen(PORT,()=>{
    console.log('http://localhost:'+PORT);
});