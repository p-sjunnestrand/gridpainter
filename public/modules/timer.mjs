import { correctImg } from "../modules/correctImg.mjs";


export function startTimer(){
    // socket.emit("startTimer");
    let startGameBox = document.getElementById("startGameBox");
    console.log("startGameBox", startGameBox);

    startGameBox.insertAdjacentHTML("beforebegin", "<div id = 'timerBox'></div>")
    
    let timerBox = document.getElementById("timerBox");
    console.log();

    socket.on("timer", function (data){
        timerBox.innerHTML = "<p>Time: " + data.countdown + "</p>";
    });

    socket.on("timesUp", time=>{
        if(time == 0 ){
            correctImg();
            
            alert("Times up!");
        }
    })
}


