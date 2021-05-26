// import { Socket } from "./socket.io";

export function correctImg() {
  console.log("correctMsgContainer", correctMsgContainer);
  const savedImg = JSON.parse(localStorage.getItem('gridColors'));
  console.log(savedImg);

  const facitImg = JSON.parse(localStorage.getItem("facitGrid"));
  console.log(facitImg);

  const total = 225;
  let sum = 0;

  function compareArrays(savedImg, facitImg) {
    for(let i = 0; i<savedImg.length; i++){
      if(savedImg[i].color !=null && facitImg[i].color === savedImg[i].color) {
        sum++;
      }
    }
  }
  compareArrays(savedImg, facitImg);
  console.log("sum", sum);

  //avrunda uppåt:
  let scorePercentage = Math.floor(sum*100/total);
  console.log("scorePercentage rounded up", scorePercentage);

  socket.emit("printScore", {"score": scorePercentage});
  
  // socket.on("printScore", scoreObject => {
  //   console.log("scoreObject from printScore socket", scoreObject);
  //   correctMsgContainer.innerHTML = `<p>Your score: ${scoreObject.score}% out of 100%.</p>`;

  // });



  // return scorePercentage;
}