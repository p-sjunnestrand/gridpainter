export function gridClick(e, userColor) {
    
    console.log("color is : "+ userColor);
    console.log("grid id", e.target.id);

    socket.emit("grid click", {coordinates: e.target.id, playerColor: userColor});

    
}