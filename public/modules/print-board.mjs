import { saveImg } from "../modules/saveImg.mjs";
import { gridClick } from "../modules/gridClick.mjs";
import { updateGridColors } from "../modules/updateGridColor.mjs";
import { getImg } from "../modules/getImage.mjs";
import { printGameMode } from "./printGameMode.mjs";

export function printBoard(userName, userColor, saveRoute, stopTimeRoute, gridStateRoute, gameStarted, correctImgRoute) {

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
                <div id="btn-container">
                    <button id="saveImg">Save image</button>
                    <button id="eraseImg">Restart</button>
                    <button id="quitBtn">Quit</button>
                </div>
        </div>
        `;

    root.innerHTML = board;
    // root.insertAdjacentHTML("beforeend", board);

    // let correctMsgContainer = document.getElementById("correctMsgContainer");

    updateGridColors(gridStateRoute);

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
        saveImg(userNameObj, saveRoute);
    })

    // let gallBtn = document.getElementById('galleryBtn');
    // gallBtn.addEventListener('click', (e) => {
    //     getImg();
    // });

    // let correct = document.getElementById('correctBtn');
    // correct.addEventListener('click', function () {

    //     // correctImg(correctMsgContainer);
    //     correctImg(stopTimeRoute);


    // });

    let quitBtn = document.getElementById('quitBtn');
    quitBtn.addEventListener('click', e => {
        window.location.reload();
    })

    socket.on("printScore", scoreObject => {
        let correctMsgContainer = document.getElementById("correctMsgContainer");
        console.log("scoreObject from printScore socket", scoreObject);
        // let scoreString = toString(scoreObject);
        correctMsgContainer.innerHTML = `<p>Your score: ${scoreObject}% out of 100%.</p>`;


    });





    let eraseImgBtn = document.getElementById("eraseImg");
    eraseImgBtn.addEventListener("click", function () {

        socket.emit("empty grid", { text: "text" });



    });
    socket.on("empty grid", data => {
        localStorage.setItem("gridColors", JSON.stringify(data));
        //console.log(localStorage.getItem("gridColors"));
        updateGridColors(gridStateRoute);
    });

    //checks if game is started. If so, fetches server that responds with current calque image.
    if (gameStarted === true) {
        socket.emit("late login");
    }
    socket.on("random pic", data => {
        let gridState = data.gridState;
        printGameMode(stopTimeRoute, correctImgRoute);
        console.log('rad 125', correctImgRoute);
        for (let state in gridState) {
            document.getElementById(`f-${gridState[state].id}`).style.backgroundColor = gridState[state].color;
        }
        // let gridToLocal = JSON.stringify(gridState);
        // localStorage.setItem("facitGrid", gridToLocal);
    })

}