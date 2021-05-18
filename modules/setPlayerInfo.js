function setPlayerName(startGameBtn, inputUserName) {
    document.getElementById(startGameBtn).addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');
        let inputNameValue = document.getElementById(inputUserName).value;
        console.log(inputNameValue);
        if(!inputNameValue){
          console.log('Please pick a name!');
        } else {
          localStorage.setItem("playerName", inputNameValue);
          console.log("localStorage", localStorage.getItem("playerName"));
        }
      })
}

module.exports = setPlayerName;