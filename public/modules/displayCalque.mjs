
export function displayCalque() {

    let calqueDiv = `
                        <div id = "calqueGridContainer">`;

    for (let r = 1; r < 16; r++) {

        for (let c = 1; c < 16; c++) {
            calqueDiv += `<div id=f-y${r}x${c} class=calque-pixels></div>`;
        }
    };

    //calqueDiv += ;


    document.getElementById('root').insertAdjacentHTML('beforeend', `<div id = "calqueWrap"></div></div>`);
    
    document.getElementById("calqueWrap").innerHTML = calqueDiv;

    // socket.on("random pic", data => {
    //     let gridState = data.gridState;

    //     for (let state in gridState) {
    //         document.getElementById(`f-${gridState[state].id}`).style.backgroundColor = gridState[state].color;
    //     }
    //     let gridToLocal = JSON.stringify(gridState);
    //     localStorage.setItem("facitGrid", gridToLocal);
    // })


    // let gridState = JSON.parse(localStorage.getItem("facitGrid"));
    // for (let state in gridState) {
    //     document.getElementById(`f-${gridState[state].id}`).style.backgroundColor = gridState[state].color;
    // }
}