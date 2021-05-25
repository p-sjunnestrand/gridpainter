export function correctImg() {
  console.log("correctMsgContainer", correctMsgContainer);
  const savedImg = JSON.parse(localStorage.getItem('gridColors'));
  console.log(savedImg);

  const facitImg = JSON.parse(localStorage.getItem('gridColors'));
  console.log(facitImg);

  const total = 225;
  let sum = 0;

  function compareArrays(savedImg, facitImg) {
    for(let i = 0; i<savedImg.length; i++){
      if(savedImg[i].color !=null && facitImg.color == savedImg.color) {
        sum++;
      }
    }
  }
  compareArrays(savedImg, facitImg);
  console.log("sum", sum);
  
  // let scorePercentage = sum*100/total;
  // console.log("scorePercentage", scorePercentage);

  //avrunda uppåt:
  let scorePercentage = Math.floor(sum*100/total);
  console.log("scorePercentage rounded up", scorePercentage);

  correctMsgContainer.innerHTML = `<p>Your score: ${scorePercentage}% out of 100 %.</p>`;


  return scorePercentage;
}