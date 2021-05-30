export function gridClick(e, userColor) {
    socket.emit("grid click", { coordinates: e.target.id, playerColor: userColor });
}