import { saveImg } from "../modules/saveImg.mjs"

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

    for (let r = 1; r < 16; r++) {

        for (let c = 1; c < 16; c++) {
            board += `<div id=y${r}x${c} class=pixels></div>`;
        }
    };

    board +=
        `</div>

                </section>
                <button id="saveImg">Spara bild</button>
            </div>
        `;

    root.innerHTML = board;

    let gridContainer = document.getElementById("gridContainer");
    gridContainer.addEventListener("click", (e) => {
        console.log("color is : " + userColor);

        document.getElementById(e.target.id).style.backgroundColor = userColor;

        let gridClick = {
            id: e.target.id,
            color: e.target.style.backgroundColor,
            type: e.type
        };

        socket.emit("gridClick", gridClick);

        socket.on("gridClick", gridClick => {
            console.log(gridClick);
            document.getElementById(gridClick.id).style.backgroundColor = gridClick.color;
            // document.getElementById(gridClick.id).type = gridClick.type;
        })
    })


    let save = document.getElementById('saveImg');
    save.addEventListener('click', e => {
        console.log('sparad bild');
        saveImg({});// bild objekt
    })




}