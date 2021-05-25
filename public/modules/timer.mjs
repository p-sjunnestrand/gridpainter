import { correctImg } from "../modules/correctImg.mjs";

document.getElementById("root").insertAdjacentHTML("beforebegin", "<div id = 'timerBox'></div>")
let timeBox = document.getElementById("timerBox");

export function startTimer(){
    socket.emit("startTimer");

    socket.on("timer", function (data){
        timeBox.innerHTML = "<p>Time: " + data.countdown + "</p>";
    });

    socket.on("timesUp", time=>{
        if(time == 0 ){
            //alert("Times up!");
            correctImg();
        }
    })
}


