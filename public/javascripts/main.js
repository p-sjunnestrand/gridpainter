import { printStartPage } from "../modules/printStartPage.mjs"
import { logIn } from "../modules/logIn.mjs"


printStartPage();

let startBtn = document.getElementById('startGameBtn');
let gallBtn = document.getElementById('galleryBtn');

let userName = document.getElementById('inputUserName');

startBtn.addEventListener('click', (e) => {
 console.log('klick');
})

gallBtn.addEventListener('click', (e) => {
 console.log('galleri');
})