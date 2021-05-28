import { correctImg } from "../modules/correctImg.mjs";
import { displayCalque } from "../modules/displayCalque.mjs";
import { startTimer } from "./timer.mjs";


export function printGameMode(stopTimeRoute, correctImgRoute){
    let startBox = document.getElementById("startGameBox");
    startBox.innerHTML = "";

    console.log("start is klicked!");

    startTimer();

    startBox.insertAdjacentHTML("afterbegin", `<button id="correctBtn">Finish Game</button> <div id="correctMsgContainer"></div>`);

    displayCalque();

    let correctMsgContainer = document.getElementById("correctMsgContainer");

    let correct = document.getElementById('correctBtn');
    correct.addEventListener('click', function () {
        //skickar stop till timern
        fetch(stopTimeRoute)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            correctImg(correctImgRoute);
        });
    });
}