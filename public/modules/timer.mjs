let timeLeft = 5;
document.getElementById("root").insertAdjacentHTML("beforebegin", "<div id = 'timerBox'></div>")
let timeBox = document.getElementById("timerBox");
export function startTimer(){
    let timer = setInterval(function(){
        console.log(timeLeft);
        timeLeft --;
        timeBox.innerHTML = "<p>Time: " + timeLeft + "</p>";
        if(timeLeft == 0){
            alert("Times up!");
            clearInterval(timer);
            // Antingen setLocalstorage att timesUp = true och kollarsen i main om den är sann/falsk, om sann kör rättningsfunctionen
            // eller kör rättningsfunctionen direkt här
        }
    }, 1000);
}


