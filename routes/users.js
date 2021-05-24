var express = require('express');
var router = express.Router();
router.get('/colors');

const colors = [
  {"color": "blue", "taken":false},
  {"color": "red", "taken":false},
  {"color": "yellow", "taken":false},
  {"color": "pink", "taken":false}
]

router.post('/colors', function(req, res, next) {
  // console.log('colors!');
  let colorPicked = false;
  for(color in colors){
    // console.log(colors[color].color);
    if(colors[color].taken === false){
      // console.log(colors[color].color + "color is available!");
      let chosenColor = {"color": colors[color].color};
      res.json(chosenColor);
      colors[color].taken = true;
      // console.log(colors[color].taken);
      colorPicked = true;
      break;
    } else {
      continue;
    }
      // res.json({"color": "none"}) 
  }
  if(colorPicked === false){
    res.json({"color": "none"})
  }
});


/* GET users listing. */
router.get('/', function (req, res, next) {

  res.send('Hello World');
});


module.exports = router;
