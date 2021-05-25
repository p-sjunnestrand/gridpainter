var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');


/* GET home page. */
router.get('/', function (req, res) {

    req.app.locals.db.collection("savedPaints").find().toArray()
    .then(paintInfo => {
        console.log("paintInfo from db savedPaints", paintInfo);
        res.json( {'paintInfo': paintInfo });
        // for (let paint in paintInfo) {
        //     console.log("paintInfo[paint]", paintInfo[paint]);
        //     // console.log("paintInfo[paint].gridState", paintInfo[paint].gridState);
        //     // let paintObjects = paintInfo[paint];
        //     res.json( {'paintInfo': paintInfo[paint] });

        // }
    });




    // res.json( {'code': 'hej från gallery' });
});

module.exports = router;


// app.get('/gallery', function (req, res, next) {

    //     let query = {}
    //     let projection = { userName: 1, gridState: 1 }
    
    
    //     req.app.locals.db.collection('savedPaints').find(query, projection)
    //         .sort({ name: 1 })
    //         .toArray()
    //         .then(items => {
    //             console.log(`Successfully found ${items.length} documents.`)
    //             console.log(items);
    //             res.json(items);
    //         })
    //         .catch(err => console.error(`Failed to find documents: ${err}`))
    
    
    
    // });
    