export function getImg(galleryRoute) {

 fetch(galleryRoute)
  .then(res => res.json())
  .then((paintInfo) => {

  //  console.log("paintInfo", paintInfo);

   let galleryContainer = document.getElementById("galleryContainer");
   let printGalleryTemplate = `<h3>Bilder</h3>`; 

   for (let obj in paintInfo) {
    //  console.log("paintInfo[obj].length", paintInfo[obj].length);

     for (let i=0; i<paintInfo[obj].length; i++) {
      //  console.log("paintInfo[obj][i]", paintInfo[obj][i]);
      //  console.log("userName", paintInfo[obj][i].userName);
      //  console.log("gridState", paintInfo[obj][i].gridState);
       let gridStates = paintInfo[obj][i].gridState;
      // console.log("gridStates", gridStates);


       printGalleryTemplate += `
       <div class="paintContainer">
         <h4>${paintInfo[obj][i].userName}</h4>
         <div class="savedPaintGridContainer">
      `;

      // console.log("gridStates.length", gridStates.length);
      for (let iter=0; iter<gridStates.length; iter++) {

        //make pixels with "null color" white 
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