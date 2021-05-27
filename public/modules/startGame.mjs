import { randomPic } from "./randomPic.mjs";
import { startTimer } from "./timer.mjs";
import { displayCalque } from "../modules/displayCalque.mjs";
import { correctImg } from "./correctImg.mjs"; 


export function Start(startGameRoute, stopTimeRoute, randomRoute) {
    const root = document.getElementById('root');
    // root.insertAdjacentHTML("beforebegin", "<div id ='startGameBox'></div>");
    // let startGameBtn = document.createElement('button');
    // startGameBtn.innerText = 'Start game';
    // startGameBtn.id = 'startGameBtn';
    // document.getElementById('startGameBox').appendChild(startGameBtn);
    // // let startBtn = document.getElementById("startGameBtn");
    // let startBox = document.getElementById("startGameBox");

    let startGameTemplate = `
        <div id="startGameBox">
            <button id="startGameBtn">Start Game</button>
        </div>
    `;

    root.insertAdjacentHTML("afterbegin", startGameTemplate);
    const startGameBtn = document.getElementById("startGameBtn");
    

    startGameBtn.addEventListener('click', () => {

        // socket.emit("startGame", {text: "testing"});
        // randomPic();
        fetch(startGameRoute)
        console.log('game start clicked!');

       
    });

   
    startTimer(stopTimeRoute);
    // socket.on("timer", function (data){
    //     timeBox.innerHTML = "<p>Time: " + data.countdown + "</p>";
    // });

    socket.on("startGame", data => {


        startBox.innerHTML = "";
        startTimer();

        // if(localStorage.getItem("hasStarted") !== "true"){

        // }


    });

    socket.on("start klicked", data =>{
        console.log("statrt is klicked!");

        startGameBtn.remove();
        document.getElementById("startGameBox").insertAdjacentHTML("afterbegin", `<button id="correctBtn">Finish Game</button> <div id="correctMsgContainer"></div>`);

        
        
        displayCalque(randomRoute);
        // startGameBtn.remove();
        // .then(result => result.json())
        // .then(data => {
        //     console.log(data);
        // })

        let correctMsgContainer = document.getElementById("correctMsgContainer");

        let correct = document.getElementById('correctBtn');
        correct.addEventListener('click', function () {
    
            // correctImg(correctMsgContainer);
            correctImg(stopTimeRoute, correctMsgContainer);
    
    
        });
    });

    // if(localStorage.getItem("hasStarted") == "true"){
    //     startBox.innerHTML = "";
    //     socket.emit("startGame", {text: "testing"});
    //     displayCalque();
    //     startTimer();

    //     // socket.on("startGame", data => {
    //     //     // startBox.innerHTML = "";

    //     //     //displayCalque();         
    //     // });
    // }


}