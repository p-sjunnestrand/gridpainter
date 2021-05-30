import { correctImg } from "../modules/correctImg.mjs";


export function startTimer(stopTimeRoute) {
    let startGameBox = document.getElementById("startGameBox");

    startGameBox.insertAdjacentHTML("beforebegin", "<div id = 'timerBox'></div>")

    let timerBox = document.getElementById("timerBox");

    socket.on("timer", function (data) {
        timerBox.innerHTML = "<p>Time: " + data.countdown + "</p>";
    });

    socket.on("timesUp", time => {
        if (time == 0) {
            correctImg(stopTimeRoute);

            alert("Times up!");
        }
    })
}


