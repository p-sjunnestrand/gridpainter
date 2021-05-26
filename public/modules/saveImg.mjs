export function saveImg(userName, saveRoute) {

  fetch(saveRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userName)
  })
    .then(res => res.json())
    .then((data) => {

      console.log(data);
      // return data;

    });



}