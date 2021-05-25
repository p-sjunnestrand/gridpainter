import { randomPic } from "./randomPic.mjs";
import { startTimer } from "./timer.mjs";
import { displayCalque } from "../modules/displayCalque.mjs";

export function Start(){
    const root = document.getElementById('root');
    root.insertAdjacentHTML("beforebegin", "<div id ='startGameBox'><button id ='startGameBtn'>Start game</button></div>")
    let startBtn = document.getElementById("startGameBtn");
    let startBox = document.getElementById("startGameBox");

    startBtn.addEventListener('click', () => {
        localStorage.setItem("hasStarted", "true")
        socket.emit("startGame", {text: "testing"});
        randomPic();
        
    });
    socket.on("startGame", data => {
        startBox.innerHTML = "";
        startTimer();
        
        displayCalque();
    });

    if(localStorage.getItem("hasStarted") == "true"){
        socket.emit("startGame", {text: "testing"});
        socket.on("startGame", data => {
            startBox.innerHTML = "";
       
            //displayCalque();         
            startTimer();
        });
    }

    
    
}