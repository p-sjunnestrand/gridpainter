//Localhost
let galleryRoute = "http://localhost:3000/gallery";
let randomRoute = "http://localhost:3000/random"; //flytta från app.js till egen route?
let colorRoute = "http://localhost:3000/colors"; //flytta från app.js till egen route?
let saveRoute = "http://localhost:3000"; //flytta från app.js till egen route?
let startGameRoute = "http://localhost:3000/startGame"; 
let stopTimeRoute = "http://localhost:3000/stopTime"; 
let gridStateRoute = "http://localhost:3000/gridState"

// Heroku 
// let galleryRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/gallery";
// let randomRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/random"; 
// let colorRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/colors"; 
// let saveRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/"; 
// let startGameRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/startGame"; 
// let stopTimeRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/stopTime"; 
// let gridStateRoute = "https://fed20d-grupp8-gridpainter.herokuapp.com/gridState";


import { printStartPage } from "../modules/printStartPage.mjs"
import { setPlayerInfo } from "../modules/setPlayerInfo.mjs"
import { printBoard } from "../modules/print-board.mjs"
import { printChat } from "../modules/printchat.mjs";
import { getImg } from "../modules/getImage.mjs";
// import { displayCalque } from "../modules/displayCalque.mjs";



import {Start} from "../modules/startGame.mjs";

// localStorage.clear();
printStartPage();


let startBtn = document.getElementById('startGameBtn');
let gallBtn = document.getElementById('galleryBtn');


startBtn.addEventListener('click', (e) => {
    console.log('klick');

    startGame();

})



gallBtn.addEventListener('click', (e) => {
    // console.log('klick galleri');
    getImg(galleryRoute);

});



// console.log(gridArray);
//Awaits setPlayerFunction to fetch server and finish before running the other functions in order to properly set let userColor from LS.
async function startGame() {

    let userName = document.getElementById('inputUserName').value;

    await setPlayerInfo(colorRoute).catch(error => alert(error));
    console.log('launching game!');
    
    

    let userColor = localStorage.getItem("playerColor");
    console.log("Playercolor" + localStorage.getItem("playerColor"));

    printBoard(userName, userColor, saveRoute, stopTimeRoute, gridStateRoute);
    printChat(userName);
    // displayCalque();
    // randomPic();

    Start(startGameRoute, stopTimeRoute, randomRoute);


}
// socket.on("random pic", data => {
//     console.log("random int", data);
// })