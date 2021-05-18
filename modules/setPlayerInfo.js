
function setPlayerName() {
  

  console.log('click');
  let inputNameValue = document.getElementById('inputUserName').value;
  console.log(inputNameValue);
  if(!inputNameValue){
    console.log('Please pick a name!');
  } else {
    localStorage.setItem("playerName", inputNameValue);
    console.log("localStorage", localStorage.getItem("playerName"));
  }


  fetch("../color.json")
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log("hello from json");
    for(obj in data){
      if(data[obj].taken === false && localStorage.getItem("playerColor", null)){
        console.log(data[obj].color + "color is available!");
        localStorage.setItem("playerColor", data[obj].color);
      }else{
        console.log(data[obj].color + "color is taken!");
      }
    }
  });
  
}


module.exports = setPlayerName;