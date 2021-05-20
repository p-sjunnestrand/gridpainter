import { printStartPage } from "../modules/printStartPage.mjs"
import { logIn } from "../modules/logIn.mjs"
import {setPlayerName} from "../modules/setPlayerInfo.mjs"
import {printBoard} from "../modules/print-board.mjs"
import { printChat } from "../modules/printchat.mjs";


printStartPage();

let startBtn = document.getElementById('startGameBtn');
let gallBtn = document.getElementById('galleryBtn');





startBtn.addEventListener('click', (e) => {
 console.log('klick');
 let userName = document.getElementById('inputUserName').value;
 setPlayerName();
//  console.log("Player info "+playerInfo);
 printBoard();

 printChat(userName);

//  location.href="game.html";
})

gallBtn.addEventListener('click', (e) => {
 console.log('galleri');
})