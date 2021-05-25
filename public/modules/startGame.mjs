import { randomPic } from "./randomPic.mjs";
import { startTimer } from "./timer.mjs";

export function Start(){
    const root = document.getElementById('root');
    root.insertAdjacentHTML("beforebegin", "<div id ='startGameBox'><button id ='startGameBtn'>Start game</button></div>")
    let startBtn = document.getElementById("startGameBtn");


    startBtn.addEventListener('click', () => {
        localStorage.setItem("hasStarted", "true")
        console.log(localStorage.getItem("hasStarted"));
        socket.emit("startGame", {text: "testing"});
    });
    socket.on("startGame", data => {
        startTimer();
        randomPic();
    });

    if(localStorage.getItem("hasStarted") == "true"){
        console.log("true it has started");
        socket.emit("startGame", {text: "testing"});
        socket.on("startGame", data => {
            startTimer();

            
            //random pic bör nog bytas ut till att den hämtar info om bilden som valdes i random pic, 
            //annars borde den nog göra en annan random bild
            randomPic();
        });
    }

    
    
}