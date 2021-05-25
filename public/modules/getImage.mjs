export function getImg() {

 fetch("http://localhost:3000/gallery")
  .then(res => res.json())
  .then((paintInfo) => {

   console.log("paintInfo", paintInfo);

   let galleryContainer = document.getElementById("galleryContainer");
   let printGalleryTemplate = `

           <h3>Bilder</h3>
       
   `; 

   for (let obj in paintInfo) {
    //  console.log("paintInfo[obj].length", paintInfo[obj].length);

     for (let i=0; i<paintInfo[obj].length; i++) {
      //  console.log("paintInfo[obj][i]", paintInfo[obj][i]);
      //  console.log("userName", paintInfo[obj][i].userName);
      //  console.log("gridState", paintInfo[obj][i].gridState);
       let gridStates = paintInfo[obj][i].gridState;
      console.log("gridStates", gridStates);


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

        
        // console.log("gridStates[iter]", gridStates[iter]);

      }
      printGalleryTemplate += `</div></div>`;

      //prints grid
      // for (let r = 1; r < 16; r++) {

      //   for (let c = 1; c < 16; c++) {
      //     printGalleryTemplate += `<div id=f-y${r}x${c} class=calque-pixels></div>`;

      //   };
      // };

      //adds color to grid according to savedPaints from db
      

      for (let state in gridStates){
        // console.log("gridStates[state]", gridStates[state]);
        // console.log("fånga färgen", gridStates[state].color);
        // console.log("fånga id", gridStates[state].id);
        if (gridStates[state].color == "blue") {
          // savedPaintPixel.classList.add = "blue"
          // document.getElementById(gridStates[state].id).style.backgroundColor = gridStates[state].color;
          

        }

        

        // console.log("gridStates[state] där pixels ej ska vara null", gridStates[state]);
        // console.log("detta funkar", gridStates[state].id);
        // console.log("detta funkar också", gridStates[state].color);
        // document.getElementById(gridStates[state].id).style.backgroundColor = gridStates[state].color;
        // document.getElementById(gridChange[change].id).style.backgroundColor = gridChange[change].color;

      };
    

     }
    


     

   }

  //  printGalleryTemplate += `</div>`;

   galleryContainer.insertAdjacentHTML("beforeend", printGalleryTemplate);


   // return data;

  });



}