var express = require('express');
var router = express.Router();
router.get('/colors');


/* GET users listing. */
router.get('/', function (req, res, next) {

  res.send('Hello World');
});


module.exports = router;
