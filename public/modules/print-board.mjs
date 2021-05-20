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

    let gridContainer = document.getElementById("gridContainer");
    gridContainer.addEventListener("click", function(e) {
        //console.log("klickade id:et är: ", e.path[0].id);
        console.log("color is : "+ userColor);
    })

}