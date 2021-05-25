export function isSameSender(msg){
    let sender = msg.playerName;
    console.log('sender:', sender);
    if(sender === localStorage.getItem('playerName')){
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  }