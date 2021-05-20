
import { printStartPage } from "../modules/printStartPage.mjs"
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
 let userColor = localStorage.getItem("playerColor");
console.log("Playercolor" + localStorage.getItem("playerColor"));
 printBoard(userColor);

 printChat(userName);


 
//  location.href="game.html";
})

gallBtn.addEventListener('click', (e) => {
 console.log('galleri');
})


let gridArray = []
let info;
for (let r=1; r<16; r++) {
    for (let c=1; c<16; c++) {
        info = {id: `y${r}x${c}`, color: null};
        gridArray.push(info);
    }   
};
console.log(gridArray);