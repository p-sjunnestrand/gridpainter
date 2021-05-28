import { randomPic } from "./randomPic.mjs";
import { startTimer } from "./timer.mjs";
import { displayCalque } from "../modules/displayCalque.mjs";
import { correctImg } from "./correctImg.mjs";


<<<<<<< HEAD

export function Start(startGameRoute, stopTimeRoute, randomRoute) {
=======
export function Start(startGameRoute, stopTimeRoute, randomRoute, printGameModeRoute) {
>>>>>>> 149cb11e1cf0cc7d9ffb4a38f5001e0c6b1c26b1
    
    const root = document.getElementById('root');
    let startGameTemplate = `
        <div id="startGameBox">
            <button id="startGameBtn">Start Game</button>
        </div>`;

    root.insertAdjacentHTML("afterbegin", startGameTemplate);
    const startGameBtn = document.getElementById("startGameBtn");


    startGameBtn.addEventListener('click', () => {
        randomPic(randomRoute);
        fetch(startGameRoute);
        
<<<<<<< HEAD
        fetch("http://localhost:3000/printGameMode");
=======
        fetch(printGameModeRoute);
>>>>>>> 149cb11e1cf0cc7d9ffb4a38f5001e0c6b1c26b1
    });

    // fetch(startGameRoute)
    // .then(res => res.json())
    // .then(data => {
    //     if(data === true){

    //     }
    // });

<<<<<<< HEAD
    fetch("http://localhost:3000/printGameMode");
=======
    fetch(printGameModeRoute);
>>>>>>> 149cb11e1cf0cc7d9ffb4a38f5001e0c6b1c26b1

    function printGameMode(){
        let startBox = document.getElementById("startGameBox");
        console.log("statrt is klicked!");
        startBox.innerHTML = "";
        startTimer();
        startGameBtn.remove();
        startBox.insertAdjacentHTML("afterbegin", `<button id="correctBtn">Finish Game</button> <div id="correctMsgContainer"></div>`);


        displayCalque(randomRoute);

        let correctMsgContainer = document.getElementById("correctMsgContainer");

        let correct = document.getElementById('correctBtn');
        correct.addEventListener('click', function () {

            correctImg(stopTimeRoute, correctMsgContainer);


        });
    }

    socket.on("start klicked", data => {
        printGameMode();

    });

}