
export function displayCalque() {

    let calqueDiv = `
                        <div id = "calqueGridContainer">`;

    for (let r = 1; r < 16; r++) {

        for (let c = 1; c < 16; c++) {
            calqueDiv += `<div id=f-y${r}x${c} class=calque-pixels></div>`;
        }
    };



    document.getElementById('root').insertAdjacentHTML('beforeend', `<div id = "calqueWrap"></div></div>`);

    document.getElementById("calqueWrap").innerHTML = calqueDiv;

}