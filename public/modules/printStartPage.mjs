

export function printStartPage() {
  let root = document.getElementById('root');
  let printStartPage = `
    
    <div id="welcomeLoginWrapper">
      <img src="img/pixellogo.png" />
      <h1>Make pixel art together.</h1>
        <div id="welcomeContainer">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>

        <div id="loginContainer">
          <h2>Enter your name</h2>
          <input id="inputUserName" placeholder=""></input><br />
          <button id="logInBtn">Get started</button>
        </div>
    </div>
    <div id="galleryContainer">
      <button id="galleryBtn">Gallery</button>
    </div>
      `;

  root.insertAdjacentHTML('beforeend', printStartPage);

}