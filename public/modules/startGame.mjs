import { randomPic } from "./randomPic.mjs";
import { startTimer } from "./timer.mjs";
import { displayCalque } from "../modules/displayCalque.mjs";

export function Start(randomRoute){
    const root = document.getElementById('root');
    root.insertAdjacentHTML("beforebegin", "<div id ='startGameBox'><button id ='startGameBtn'>Start game</button></div>")
    let startBtn = document.getElementById("startGameBtn");
    let startBox = document.getElementById("startGameBox");


    startBtn.addEventListener('click', () => {

        socket.emit("startGame", {text: "testing"});
        randomPic(randomRoute);

    });
    socket.on("startGame", data => {
        

        startBox.innerHTML = "";
        startTimer();

        if(localStorage.getItem("hasStarted") !== "true"){
            displayCalque();

        }

        
    });

    if(localStorage.getItem("hasStarted") === "true"){
        startBox.innerHTML = "";
        socket.emit("startGame", {text: "testing"});
        displayCalque();
        startTimer();

        // socket.on("startGame", data => {
        //     // startBox.innerHTML = "";
       
        //     //displayCalque();         
        // });
    }

    
}