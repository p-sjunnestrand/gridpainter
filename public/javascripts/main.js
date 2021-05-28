//Localhost
// let galleryRoute = "http://localhost:3000/gallery";
// let randomRoute = "http://localhost:3000/random"; //flytta från app.js till egen route?
// let colorRoute = "http://localhost:3000/colors"; //flytta från app.js till egen route?
// let saveRoute = "http://localhost:3000"; //flytta från app.js till egen route?
// let startGameRoute = "http://localhost:3000/startGame";
// let stopTimeRoute = "http://localhost:3000/stopTime";
// let gridStateRoute = "http://localhost:3000/gridState";
//let printGameModeRoute = "http://localhost:3000/printGameMode";



// Heroku 
let galleryRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/gallery";
let randomRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/random";
let colorRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/colors";
let saveRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/";
let startGameRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/startGame";
let stopTimeRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/stopTime";
let gridStateRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/gridState";
let printGameModeRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/printGameMode";

import { printStartPage } from "../modules/printStartPage.mjs";
import { callLoginPage } from "../modules/callLoginPage.mjs";
import { getImg } from "../modules/getImage.mjs";

printStartPage();

let logInBtn = document.getElementById('logInBtn');
let gallBtn = document.getElementById('galleryBtn');

logInBtn.addEventListener('click', (e) => {
    let userName = document.getElementById('inputUserName').value;
    callLoginPage(colorRoute, randomRoute, saveRoute, startGameRoute, stopTimeRoute, gridStateRoute, userName, printGameModeRoute);
})

gallBtn.addEventListener('click', (e) => {
    getImg(galleryRoute);
});