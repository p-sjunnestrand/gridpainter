
export function setPlayerName() {
  console.log(localStorage.getItem("playerColor"));
  console.log('click');

  let inputNameValue = document.getElementById('inputUserName').value;

  console.log("inputNameValue: " + inputNameValue);
  if(!inputNameValue){
    console.log('Please pick a name!');
  } else {
    localStorage.setItem("playerName", inputNameValue);
    console.log("localStorage", localStorage.getItem("playerName"));
    

    fetch("http://localhost:3000/users/colors", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log("hello from json");
      console.log(data.color);
      if(data.color === 'none'){
          console.log("Game is full");
          alert("The game is full. Try again later.")
      } else {
          localStorage.setItem("playerColor", data.color);
      }
    });
  }
}
