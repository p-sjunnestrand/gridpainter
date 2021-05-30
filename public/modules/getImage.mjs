export function getImg(galleryRoute) {

  fetch(galleryRoute)
    .then(res => res.json())
    .then((paintInfo) => {


      let galleryContainer = document.getElementById("galleryContainer");
      let printGalleryTemplate = `<h3>Bilder</h3>`;

      for (let obj in paintInfo) {

        for (let i = 0; i < paintInfo[obj].length; i++) {
          let gridStates = paintInfo[obj][i].gridState;

          printGalleryTemplate += `
       <div class="paintContainer">
         <h4>${paintInfo[obj][i].userName}</h4>
         <div class="savedPaintGridContainer">
      `;

          for (let iter = 0; iter < gridStates.length; iter++) {

            if (gridStates[iter].color == null) {
              gridStates[iter].color = "white";
            };

            let savedPaintPixel = `<div id=${gridStates[iter].id} class="savedPaintPixels ${gridStates[iter].color}"></div>`;
            printGalleryTemplate += savedPaintPixel;

          };
          printGalleryTemplate += `</div></div>`;

        };
      };

      galleryContainer.insertAdjacentHTML("beforeend", printGalleryTemplate);

    });
};