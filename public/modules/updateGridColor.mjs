export function updateGridColors(){
    let colorBoard = JSON.parse(localStorage.getItem("gridColors")) ;
    //console.log("color board is "+colorBoard);
    for(let color in colorBoard){
        if (colorBoard[color].color !== null) {
            document.getElementById(colorBoard[color].id).style.backgroundColor = colorBoard[color].color;
        }else{
            document.getElementById(colorBoard[color].id).style.backgroundColor = "#f4eee2";
        }
    }
}