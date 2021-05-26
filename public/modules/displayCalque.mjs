
//import { randomPic} from "../modules/randomPic.mjs"

export function displayCalque() {
    let calqueDiv = `<div id = "calqueWrap">
                        <div id = "calqueGridContainer">`;

    for (let r = 1; r < 16; r++) {

        for (let c = 1; c < 16; c++) {
            calqueDiv += `<div id=f-y${r}x${c} class=calque-pixels></div>`;
        }
    };

    calqueDiv += `</div>`;
    document.getElementById('gameBoardContainer').insertAdjacentHTML('afterend', calqueDiv);

    //randomPic();

    // console.log(randomPic());
    socket.on("random pic", data => {
        // console.log("random int", data.gridState);
        let gridState = data.gridState;
        // console.log(gridState);
        
        for (let state in gridState){
            // console.log(gridState[state].color);
            document.getElementById(`f-${gridState[state].id}`).style.backgroundColor = gridState[state].color;
            // document.getElementById(`f-${gridState[state].id}`).classList.add(gridState[state].color);
            
        }
        let gridToLocal = JSON.stringify(gridState);
        localStorage.setItem("facitGrid", gridToLocal);
    })


    let gridState = JSON.parse(localStorage.getItem("facitGrid"));
    for (let state in gridState){
        document.getElementById(`f-${gridState[state].id}`).style.backgroundColor = gridState[state].color;  
    }
    localStorage.setItem("hasStarted", "true");
}