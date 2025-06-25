const socket=io();

const btn=document.querySelector('#btn');
const chatbox=document.querySelector('#chatbox');


socket.on('Welcome',(msg)=>{
    console.log(msg);
})

btn.addEventListener('click',(ev)=>{
    // console.log(ev.target.value);
socket.emit('chat',{
    msg:chatbox.value
},(res)=>{
    console.log(res.status);
})
})