export function updateGridColors(gridStateRoute){
    // let colorBoard = JSON.parse(localStorage.getItem("gridColors")) ;
    fetch(gridStateRoute)
    .then(result => result.json())
    .then(data => {
        console.log(data);
        for (let gridState in data){
            console.log(data[gridState]);
            let gridStatePixels = data[gridState];
            for (let pixel in gridStatePixels) {
                console.log(gridStatePixels[pixel].color);
                if (gridStatePixels[pixel].color !== null){
                    document.getElementById(gridStatePixels[pixel].id).style.backgroundColor = gridStatePixels[pixel].color;
                }else{
                        document.getElementById(gridStatePixels[pixel].id).style.backgroundColor = "#f4eee2";
                    }
            }
        }
    })
    //console.log("color board is "+colorBoard);
    // for(let color in colorBoard){
        // if (colorBoard[color].color !== null) {
        //     document.getElementById(colorBoard[color].id).style.backgroundColor = colorBoard[color].color;
        // }else{
        //     document.getElementById(colorBoard[color].id).style.backgroundColor = "#f4eee2";
        // }
    // }
}