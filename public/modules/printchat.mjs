export function printChat(){

    const chatDiv = document.getElementById('chat');
    
    //inserts chat window w/ input field and submit btn
    chatDiv.insertAdjacentHTML('beforeend', 
    `<div id="chatWindow">
        <ul id="chat"></ul>
    </div>
    <form id="chatForm">
        <input type="text" id="chatMsgInput">
        <button id="sendChatMsgBtn">Send</button>
    </form>`);

    let msgInput = document.getElementById('chatMsgInput');
    let chatForm = document.getElementById('chatForm');

    //grabs value of msgInput on btn click and sends to socket.io in app.js. Also sends username and color.
    chatForm.addEventListener('submit', e => {
        e.preventDefault();
        console.log('chat click!');

        if(msgInput.value){
            socket.emit("chat msg", {text: msgInput.value, playerName: localStorage.getItem('playerName'), playerColor: localStorage.getItem('playerColor')});
            msgInput.value = '';
          }
    });
    //recieves response from socket.io and displays messages in chat window.
    socket.on("chat msg", msg => {
        console.log(msg);
        let chat = document.getElementById('chat');
        
  
        chat.insertAdjacentHTML('beforeend', `<li><div chatMessage"><div class ="chatPlayerName">${msg.playerName}:</div>${msg.text}</div></li>`)
      })
    
}