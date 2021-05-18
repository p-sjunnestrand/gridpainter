var express = require('express');
var router = express.Router();
const setPlayerName = require("../modules/setPlayerInfo.js");
router.get('/colors');

const colors = [
  {"color": "blue", "taken":false},
  {"color": "red", "taken":false},
  {"color": "yellow", "taken":false},
  {"color": "pink", "taken":false}
]

let htmlHead = 
  `<link rel="stylesheet" href="/stylesheets/style.css" type="text/css">
  <title>GridPainter av Grupp 8</title>`;

let htmlHeader = 
  `<header><h1>GridPainter</h1></header>`; 

let htmlFooter = 
  `<footer>Av: Grupp 8</footer>
  <script>
    document.getElementById('startGameBtn').addEventListener('click', ${setPlayerName});
  </script>
  `; 

router.post('/colors', function(req, res, next) {
  console.log('colors!');
  let colorPicked = false;
  for(color in colors){
    console.log(colors[color].color);
    if(colors[color].taken === false){
      console.log(colors[color].color + "color is available!");
      let chosenColor = {"color": colors[color].color};
      res.json(chosenColor);
      colors[color].taken = true;
      console.log(colors[color].taken);
      colorPicked = true;
      break;
    } else {
      continue;
    }
      // res.json({"color": "none"}) 
  }
  if(colorPicked === false){
    res.json({"color": "none"})
  }
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  let printStartPage = htmlHead + htmlHeader +
    `<main>
      <div id="welcomeContainer">Skapa bilder tillsammans med dina vänner!</div>

      <div id="loginContainer">
        <input id="inputUserName" placeholder="Skriv ett användarnamn..."></input>
        <button id="startGameBtn">Starta spelet</button>
      </div>

      <div id="galleryContainer">
        <a id="galleryBtn" href="">Visa bildgalleri</a>
      </div>
    </main>` + htmlFooter; 
  res.send(printStartPage);
});


module.exports = router;
