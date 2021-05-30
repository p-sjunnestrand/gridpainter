export function isSameSender(msg) {
  let sender = msg.playerName;
  if (sender === localStorage.getItem('playerName')) {
    return true;
  } else {
    return false;
  }
}