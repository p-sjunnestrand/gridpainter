export function getImg() {

 fetch("http://localhost:3000/gallery")
  .then(res => res.json())
  .then((data) => {

   console.log(data);
   // return data;

  });



}