var express = require('express');
var router = express.Router();
const setPlayerName = require("../modules/setPlayerInfo.js");


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

/* GET users listing. */
router.get('/', function(req, res, next) {
  let printStartPage = htmlHead + htmlHeader +
    `<main>
      <div id="welcomeContainer">Skapa bilder tillsammans med dina vänner!</div>

      <div id="loginContainer">
        <input id="inputUserName" placeholder="Skriv ett användarnamn..."></input>
        <a id="startGameBtn" href="">Starta spelet</a>
      </div>

      <div id="galleryContainer">
        <a id="galleryBtn" href="">Visa bildgalleri</a>
      </div>
    </main>` + htmlFooter; 
  res.send(printStartPage);
});


module.exports = router;
