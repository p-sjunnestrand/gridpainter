

//import {startTimer} from "../modules/timer.mjs";

import { startTimer } from "./timer.mjs";

export function Start(){
    const root = document.getElementById('root');
    root.insertAdjacentHTML("beforebegin", "<div id ='startGameBox'><button id ='startGameBtn'>Start game</button></div>")
    let startBtn = document.getElementById("startGameBtn");


    startBtn.addEventListener('click', e => {
        e.preventDefault();
        socket.emit("startGame", {text: "testing"});
    });
    socket.on("startGame", data => {
        startTimer();
    });
    
}