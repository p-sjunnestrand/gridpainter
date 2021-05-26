export function saveImg(userName) {

  fetch("http://localhost:3000", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userName)
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      alert(data);
    });
}