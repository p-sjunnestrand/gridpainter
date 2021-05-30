var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');
const cors = require("cors");

router.use(cors());

/* GET home page. */
router.get('/', function (req, res) {

    req.app.locals.db.collection("savedPaints").find().toArray()
        .then(paintInfo => {
            res.json({ 'paintInfo': paintInfo });
        });
});

module.exports = router;