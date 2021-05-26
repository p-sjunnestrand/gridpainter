import { randomPic } from "./randomPic.mjs";
import { startTimer } from "./timer.mjs";
import { displayCalque } from "../modules/displayCalque.mjs";

export function Start() {
    let startBtn = document.getElementById("startGameBtn");
    let startBox = document.getElementById("startGameBox");


    startBtn.addEventListener('click', () => {

        socket.emit("startGame", { text: "testing" });
        randomPic();

    });
    socket.on("startGame", data => {


        startBox.innerHTML = "";
        startTimer();

        if (localStorage.getItem("hasStarted") !== "true") {
            displayCalque();

        }


    });

    if (localStorage.getItem("hasStarted") == "true") {
        startBox.innerHTML = "";
        socket.emit("startGame", { text: "testing" });
        displayCalque();
        startTimer();

        // socket.on("startGame", data => {
        //     // startBox.innerHTML = "";

        //     //displayCalque();         
        // });
    }


}