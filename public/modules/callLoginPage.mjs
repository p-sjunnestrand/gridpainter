import { printBoard } from "../modules/print-board.mjs";
import { printChat } from "../modules/printchat.mjs";
import { Start } from "../modules/startGame.mjs";


export function callLoginPage(colorRoute, randomRoute, saveRoute, startGameRoute, stopTimeRoute, gridStateRoute, userName, printGameModeRoute, correctImgRoute) {


  let inputNameValue = document.getElementById('inputUserName').value;

  if (!inputNameValue) {
    alert('Please pick a name!');
  } else {
    localStorage.setItem("playerName", inputNameValue);
    let getplayerId = localStorage.getItem('socketId');


    fetch(colorRoute, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerId: getplayerId })
    })
      .then(response => response.json())
      .then(colorObject => {

        let gameStarted = colorObject.started;
        if (colorObject.color === 'none') {
          alert("The game is full. Try again later.");
        } else {
          localStorage.setItem("playerColor", colorObject.color);

          let userColor = localStorage.getItem("playerColor");

          printBoard(userName, userColor, saveRoute, stopTimeRoute, gridStateRoute, gameStarted, correctImgRoute);
          printChat(userName);


          Start(startGameRoute, stopTimeRoute, randomRoute, printGameModeRoute);

        }
      });
  }

}
