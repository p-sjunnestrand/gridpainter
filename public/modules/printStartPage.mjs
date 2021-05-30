export function printStartPage() {
  let root = document.getElementById('root');
  let printStartPage = `
    
    <div id="welcomeLoginWrapper">
      <h1>Make pixel art together.</h1>
        <div id="welcomeContainer">Grid paint application using socket.io. Make pixel art together with a maximum of 4 players. Sign in with your name and choose start game if you want to draw a picture on time, or just start drawing for fun. </div>

        <div id="loginContainer">
          <h2>Enter your name</h2>
          <input id="inputUserName" placeholder=""></input><br />
          <button id="logInBtn">Get started</button>
        </div>
    </div>
    <div id="galleryContainer">
      <button id="galleryBtn">Gallery</button>
      <div id="galleryWrapper"></div>
    </div>
      `;

  root.insertAdjacentHTML('beforeend', printStartPage);

}