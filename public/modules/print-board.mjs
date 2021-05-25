import { saveImg } from "../modules/saveImg.mjs"
import { gridClick } from "../modules/gridClick.mjs"
import {updateGridColors} from "../modules/updateGridColor.mjs"

export function printBoard(userName, userColor) {

    let root = document.getElementById("root");
    let board = `
    
            <div id="gameBoardContainer">
                <h2>Welcome ${userName}</h2>
                <section>
                    <div id="displayInfoWrapper">
                        <h3>Your Color:</h3>
                        <div id="colorBox" class="${userColor}"></div>
                    </div>
                    <div id="gridContainer">`;

    for (let r = 1; r < 16; r++) {

        for (let c = 1; c < 16; c++) {
            board += `<div id=y${r}x${c} class=pixels></div>`;
        }
    };

    board +=
        `</div>

                </section>
                <button id="saveImg">Spara bild</button>

                <button id="eraseImg">Rensa bild</button>
            </div>
        `;

    root.innerHTML = board;

    updateGridColors();

    //Flytta över nedanstående till en egen mjs?
    let gridContainer = document.getElementById("gridContainer");
    gridContainer.addEventListener("click", e => {
        //funktionen skickar klick från en klient till servern
        gridClick(e, userColor);
    });

    socket.on("grid change", gridChange => {
        for (let change in gridChange) {
            if (gridChange[change].color !== null) {
                document.getElementById(gridChange[change].id).style.backgroundColor = gridChange[change].color;
            };
        };
        localStorage.setItem("gridColors", JSON.stringify(gridChange));
    });
    console.log(localStorage.getItem("playerName"));
    let userNameObj = { userName: localStorage.getItem('playerName') };

    let save = document.getElementById('saveImg');
    save.addEventListener('click', e => {
        console.log('sparad bild');
        saveImg(userNameObj);
    })



    let eraseImgBtn = document.getElementById("eraseImg");
    eraseImgBtn.addEventListener("click", function(){
       
        socket.emit("empty grid", {text: "text"});

        

    });
    socket.on("empty grid", data => {
        localStorage.setItem("gridColors", JSON.stringify(data));
        //console.log(localStorage.getItem("gridColors"));
        updateGridColors();
    });
    
}