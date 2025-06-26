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
   res.render('chat');
})

app.get('/chat',(req,res)=>{
    res.render('chat');
})

const io = new Server(httpServer);

let userMap={};

//creating the pipeline and the server side configuration
io.on("connection", (socket) => {
//   console.log("connection requested by a client");
socket.emit('Welcome',{
    msg:'welcome to our app'
})

socket.on('saveuser',({username})=>{
    console.log(username,socket.id);
    userMap[socket.id]=username;

     let activeUsers=[];
        for(let i in userMap){
activeUsers.push(userMap[i]);
        }
        
// socket.broadcast.emit('joinedChat',{
//     username,
//     activeUsers
// })
io.emit('joinedChat',{
    username,
    activeUsers
})
    console.log(userMap)
})

//to detected disconnected user
socket.on('disconnect',()=>{
    let SocketId=socket.id;
    let username=userMap[socket.id];
    console.log(`User ${username} has disconnected`);
    if(username){
        delete userMap[socket.id];
        let activeUsers=[];
        for(let i in userMap){
activeUsers.push(userMap[i]);
        }
    socket.broadcast.emit('disconnectedUser',{
        username,
        activeUsers

    })
}
})

socket.on('chat',(msg,cb)=>{
    console.log(msg);
    cb({
        status:"ok"
    })

    //now to showcase the message to every other cllient
    // io.emit('msg',{
    //     text:msg,
    //     senderName:userMap[socket.id]
    // })
    socket.broadcast.emit('msg',{
        text:msg,
        senderName:userMap[socket.id]
    })

})
});

httpServer.listen(PORT,()=>{
    console.log('http://localhost:'+PORT);
});