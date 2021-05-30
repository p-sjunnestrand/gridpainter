var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');


/* GET home page. */
router.post('/', function (req, res, next) {

 req.app.locals.db.collection('savedPaints').insertOne(req.body);

 res.json('bild sparad i db');
});

module.exports = router;
