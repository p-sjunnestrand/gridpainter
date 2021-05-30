export function Start(startGameRoute, stopTimeRoute, randomRoute, printGameModeRoute) {

    const root = document.getElementById('root');
    let startGameTemplate = `
        <div id="startGameBox">
            <button id="startGameBtn">Start Game</button>
        </div>`;

    root.insertAdjacentHTML("afterbegin", startGameTemplate);
    const startGameBtn = document.getElementById("startGameBtn");


    startGameBtn.addEventListener('click', () => {
        fetch(randomRoute);
        fetch(startGameRoute);

    });
}