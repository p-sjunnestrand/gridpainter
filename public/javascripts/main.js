
import { printStartPage } from "../modules/printStartPage.mjs"
import { setPlayerInfo } from "../modules/setPlayerInfo.mjs"
import { printBoard } from "../modules/print-board.mjs"
import { printChat } from "../modules/printchat.mjs";
import { randomPic } from "../modules/randomPic.mjs";

import {startTimer} from "../modules/timer.mjs";
import { getImg } from "../modules/getImage.mjs";





printStartPage();


let startBtn = document.getElementById('startGameBtn');
let gallBtn = document.getElementById('galleryBtn');


startBtn.addEventListener('click', (e) => {
    console.log('klick');

    startGame();

})

gallBtn.addEventListener('click', (e) => {
    console.log('galleri');
    getImg();
})



// console.log(gridArray);
//Awaits setPlayerFunction to fetch server and finish before running the other functions in order to properly set let userColor from LS.
async function startGame() {

    let userName = document.getElementById('inputUserName').value;

    await setPlayerInfo().catch(error => alert(error));
    console.log('launching game!');
    
    

    let userColor = localStorage.getItem("playerColor");
    console.log("Playercolor" + localStorage.getItem("playerColor"));

    printBoard(userName, userColor);
    printChat(userName);
    randomPic();
    
    startTimer();
}
socket.on("random pic", data => {
    console.log("random int", data);
})