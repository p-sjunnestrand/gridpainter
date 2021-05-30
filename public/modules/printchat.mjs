import { isSameSender } from "../modules/isSameSender.mjs"


export function printChat(userName){

    const root = document.getElementById('root');
    
    //inserts chat window w/ input field and submit btn
    root.insertAdjacentHTML('afterend', 
    `<div id ="chat-container">
        
        <div id="chatWindow">
        <h2>Chat</h2>
        <form id="chatForm">
            <input type="text" id="chatMsgInput">
            <button id="sendChatMsgBtn"><img src="img/arrow.png" /></button>
        </form>
        <ul id="chat"></ul>
        </div>
        
    </div>`);

    let msgInput = document.getElementById('chatMsgInput');
    let chatForm = document.getElementById('chatForm');

    //grabs value of msgInput on btn click and sends to socket.io in app.js. Also sends username and color.
    chatForm.addEventListener('submit', e => {
        e.preventDefault();
        console.log('chat click!');
        if(msgInput.value){
            socket.emit("chat msg", {text: msgInput.value, playerName: userName, playerColor: localStorage.getItem("playerColor")});
            msgInput.value = '';
          }
    });
    //recieves response from socket.io and displays messages in chat window.
    socket.on("chat msg", msg => {
        console.log(msg);
        let chat = document.getElementById('chat');
        
  
        // chat.insertAdjacentHTML('beforeend', `<li><div chatMessage"><div class ="chatPlayerName">${msg.playerName}:</div>${msg.text}</div></li>`);
        chat.insertAdjacentHTML('afterend', `<li><div class="${isSameSender(msg)?'userSender': 'otherSender'} message"><div class ="chatPlayerName">${msg.playerName}:</div>${msg.text}</div></li>`)
        // console.log();
      })
    
}