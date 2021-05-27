import { randomPic } from "./randomPic.mjs";
import { startTimer } from "./timer.mjs";
import { displayCalque } from "../modules/displayCalque.mjs";
import { correctImg } from "./correctImg.mjs";


export function Start(startGameRoute, stopTimeRoute, randomRoute) {
    const root = document.getElementById('root');
    let startGameTemplate = `
        <div id="startGameBox">
            <button id="startGameBtn">Start Game</button>
        </div>`;

    root.insertAdjacentHTML("afterbegin", startGameTemplate);
    const startGameBtn = document.getElementById("startGameBtn");


    startGameBtn.addEventListener('click', () => {
        randomPic(randomRoute);

        fetch(startGameRoute)
    });


    startTimer(stopTimeRoute);

    socket.on("startGame", data => {
        let startBox = document.getElementById("startGameBox");

        if (data) {
            startGameBtn.remove();
            document.getElementById("startGameBox").insertAdjacentHTML("afterbegin", `<button id="correctBtn">Finish Game</button> <div id="correctMsgContainer"></div>`);


            displayCalque(randomRoute);

            let correctMsgContainer = document.getElementById("correctMsgContainer");

            let correct = document.getElementById('correctBtn');
            correct.addEventListener('click', function () {

                correctImg(stopTimeRoute, correctMsgContainer);


            });

        }
        startBox.innerHTML = "";
        startTimer();
    });

    socket.on("start klicked", data => {
        console.log("statrt is klicked!");

    });
}