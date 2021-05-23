

export function printStartPage() {
 let root = document.getElementById('root');
 let printStartPage = `<main>
      <div id="welcomeContainer">Skapa bilder tillsammans med dina vänner!</div>

      <div id="loginContainer">
        <input id="inputUserName" placeholder="Skriv ett användarnamn..."></input>
        <button id="startGameBtn">Starta spelet</button>
      </div>

      <div id="galleryContainer">
        <button id="galleryBtn">Visa bildgalleri</button>
      </div>
    </main>`;

 root.insertAdjacentHTML('beforeend', printStartPage);

}