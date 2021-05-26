var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');


/* GET home page. */
router.get('/', function (req, res) {

    req.app.locals.db.collection("savedPaints").find().toArray()
    .then(paintInfo => {
        console.log("paintInfo from db savedPaints", paintInfo);
        res.json( {'paintInfo': paintInfo });
    });
});

module.exports = router;