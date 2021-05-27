
export function setPlayerInfo(colorRoute) {
  return new Promise((resolve, reject) => {
    // console.log(localStorage.getItem("playerColor"));
    // console.log('click');

    let inputNameValue = document.getElementById('inputUserName').value;

    // console.log("inputNameValue: " + inputNameValue);
    if (!inputNameValue) {
      // console.log('Please pick a name!');
      alert('Please pick a name!');
    } else {
      localStorage.setItem("playerName", inputNameValue);
      // console.log("localStorage", localStorage.getItem("playerName"));
      let getplayerId = localStorage.getItem('socketId');


      fetch(colorRoute, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerId: getplayerId })
      })
        .then(response => response.json())
        .then(colorObject => {
          // console.log("hello from json");
          console.log('colorObject', colorObject);
          if (colorObject.color === 'none') {
            // console.log("Game is full");
            reject("The game is full. Try again later.");
          } else {
            localStorage.setItem("playerColor", colorObject.color);
            // console.log('player color is ' + colorObject.color);
            resolve();
            // setUserColorVar();
          }
        });
    }
  })

}
