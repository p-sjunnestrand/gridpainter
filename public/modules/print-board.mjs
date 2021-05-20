import {gridClick} from "../modules/gridClick.mjs"

export function printBoard(userColor) {

    let root = document.getElementById("root"); 
    let board = `
    
            <div id="gameBoardContainer">
                <h2>Welcome Janne</h2>
                <section>
                    <h3>Your Color</h3>
                    <div>
                        <div id="color1"></div>
                        <div id="color2"></div>
                        <div id="color3"></div>
                        <div id="color4"></div>
                    </div>
                    <div id="gridContainer">`;

    for (let r=1; r<16; r++) {

        for (let c=1; c<16; c++) {
            board += `<div id=y${r}x${c} class=pixels></div>`;
        }   
    };

    board += 
                    `</div>

                </section>

            </div>
        `;
        
    root.innerHTML = board;
    
    //Flytta över nedanstående till en egen mjs?
    let gridContainer = document.getElementById("gridContainer");
    gridContainer.addEventListener("click", e => {
        gridClick(e, userColor);
    });
    socket.on("grid change", gridChange => {
        console.log('hello');
        document.getElementById(gridChange.coordinates).style.backgroundColor = gridChange.playerColor;
    });

}