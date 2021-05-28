import { printBoard } from "../modules/print-board.mjs";
import { printChat } from "../modules/printchat.mjs";
import { Start } from "../modules/startGame.mjs";


export function callLoginPage(colorRoute, randomRoute, saveRoute, startGameRoute, stopTimeRoute, gridStateRoute, userName) {
  // return new Promise((resolve, reject) => {
  // console.log(localStorage.getItem("playerColor"));
  // console.log('click');

  let inputNameValue = document.getElementById('inputUserName').value;

  // console.log("inputNameValue: " + inputNameValue);
  if (!inputNameValue) {
    // console.log('Please pick a name!');
    alert('Please pick a name!');
  } else {
    localStorage.setItem("playerName", inputNameValue);
    // console.log("localStorage", localStorage.getItem("playerName"));
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
        // console.log("hello from json");
        console.log('colorObject', colorObject);
        if (colorObject.color === 'none') {
          // console.log("Game is full");
          alert("The game is full. Try again later.");
        } else {
          localStorage.setItem("playerColor", colorObject.color);

          let userColor = localStorage.getItem("playerColor");
          console.log("Playercolor" + localStorage.getItem("playerColor"));

          printBoard(userName, userColor, saveRoute, stopTimeRoute, gridStateRoute);
          printChat(userName);
          // displayCalque();
          // randomPic();

          Start(startGameRoute, stopTimeRoute, randomRoute);

          // console.log('player color is ' + colorObject.color);

          // setUserColorVar();
        }
      });
  }
  // })

}
