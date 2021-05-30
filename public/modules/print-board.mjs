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
                    <button id="eraseImg">Clear</button>
                    <button id="quitBtn">Quit</button>
                </div>
        </div>
        `;

    // root.innerHTML = board;
    root.innerHTML = "";
    root.insertAdjacentHTML("beforebegin", board);

    // let correctMsgContainer = document.getElementById("correctMsgContainer");

    updateGridColors(gridStateRoute);

    let gridContainer = document.getElementById("gridContainer");
    gridContainer.addEventListener("click", e => {
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
    let userNameObj = { userName: localStorage.getItem('playerName') };

    let save = document.getElementById('saveImg');
    save.addEventListener('click', e => {
        saveImg(userNameObj, saveRoute);
    })


    let quitBtn = document.getElementById('quitBtn');
    quitBtn.addEventListener('click', e => {
        window.location.reload();
    })

    socket.on("printScore", scoreObject => {
        let correctMsgContainer = document.getElementById("correctMsgContainer");

        correctMsgContainer.innerHTML = `<img src="img/score256px.png" alt="Medal icon" width="140" height="140" />
                                        <p>Your score: ${scoreObject}% out of 100%.</p>`;
    });

    let eraseImgBtn = document.getElementById("eraseImg");
    eraseImgBtn.addEventListener("click", function () {

        socket.emit("empty grid", { text: "text" });

    });
    socket.on("empty grid", data => {
        localStorage.setItem("gridColors", JSON.stringify(data));
        updateGridColors(gridStateRoute);
    });

    if (gameStarted === true) {
        socket.emit("late login");
    }
    socket.on("random pic", data => {
        let gridState = data.gridState;
        printGameMode(stopTimeRoute, correctImgRoute);
        for (let state in gridState) {
            document.getElementById(`f-${gridState[state].id}`).style.backgroundColor = gridState[state].color;
        }
    })
}