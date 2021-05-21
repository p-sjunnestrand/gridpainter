export function saveImg(object) {

 fetch("http://localhost:3000/save", {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify(object)
 })
  .then(res => res.json())
  .then((data) => {

   console.log(data);
   // return data;

  });



}