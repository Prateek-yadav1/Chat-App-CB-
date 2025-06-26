const socket=io();

const btn=document.querySelector('#btn');
const btn1=document.querySelector('#btn1');
const userDetails=document.querySelector('.userDetails');
const chatbox=document.querySelector('#chatbox');
const chattingApp=document.querySelector('.chattingApp');
const username=document.querySelector('#username');
const msgList=document.querySelector('.msgList');
const activePeople=document.querySelector('.activePeople');



socket.on('Welcome',(msg)=>{
    console.log(msg);
    console.log(socket.id);
})
btn1.addEventListener('click',(ev)=>{
    console.log(username.value,socket.id);
    socket.emit('saveuser',{
        username:username.value
    })
userDetails.classList.add('hide');
chattingApp.classList.remove('hide');
msgList.classList.remove('hide');
})

socket.on('msg',(msg)=>{
    // console.log(msg.text.msg);
    // console.log(msg.text.senderName);
    let text=msg.text.msg;
    let senderName=msg.senderName;

    let li=document.createElement('li');
    li.innerText=`${senderName} : ${text}`;
    msgList.appendChild(li);
})

function updateActiveUser(activeUsers){
activePeople.innerHTML='';
activeUsers.forEach(element => {
    let item=document.createElement('div');
    item.innerText="●"+element;
    activePeople.appendChild(item);
});
}

socket.on('disconnectedUser',({username,activeUsers})=>{
    console.log(`${username} has left the chat , current active users are: ${activeUsers}`);
    updateActiveUser(activeUsers);
})
socket.on('joinedChat',({username,activeUsers})=>{
    console.log(`${username} has joined the chat, current active users are: ${activeUsers}`);
    updateActiveUser(activeUsers);

})


btn.addEventListener('click',(ev)=>{
    // console.log(ev.target.value);
socket.emit('chat',{
    msg:chatbox.value
},(res)=>{
    console.log(res.status);
})
chatbox.value='';
})

chattingApp.classList.add('hide');
msgList.classList.add('hide');