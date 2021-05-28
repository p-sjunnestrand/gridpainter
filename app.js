var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const randomInt = require('./randomInt');
const randomKey = require('random-key');

const cors = require("cors");
// app.options('*', cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var saveRouter = require('./routes/save');
var galleryRouter = require('./routes/gallery');


const MongoClient = require('mongodb').MongoClient;
const { on } = require('events');
const { count } = require('console');

MongoClient.connect("mongodb+srv://petterAdmin:gtnafyHN8WpQWfRB@rootcluster.d4txc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('databas uppkopplad!');

        const db = client.db("gridpainter");
        app.locals.db = db;
    })

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/save', saveRouter);
app.use('/gallery', galleryRouter);

app.use(cors());

//array that represents the gameboard. Updates with each grid click.
let gridArray = []
let info;
for (let r = 1; r < 16; r++) {
    for (let c = 1; c < 16; c++) {
        info = { id: `y${r}x${c}`, color: null };
        gridArray.push(info);
    }
};
//array that stores player colors and keeps track of number of players in game
const colors = [
    { "color": "blue", "taken": false, "player": null },
    { "color": "red", "taken": false, "player": null },
    { "color": "yellow", "taken": false, "player": null },
    { "color": "pink", "taken": false, "player": null }
]

let start = false;
let countdown = 1000;
function timer() {
    let countdownTimer = setInterval(function () {
        countdown--;
        io.sockets.emit("timer", { countdown: countdown });
        console.log(countdown);
        if (countdown == 0) {
            clearInterval(countdownTimer);
            io.emit("timesUp", countdown);
            // Antingen setLocalstorage att timesUp = true och kollarsen i main om den är sann/falsk, om sann kör rättningsfunctionen
            // eller kör rättningsfunctionen direkt här
        }
    }, 1000);
}

app.get('/stopTime', function (req, res, next) {
    countdown = 1;
    //clearInterval(countdownTimer);
});

// Save picture to db
app.post('/', function (req, res, next) {

    console.log('rad 50', req.body);

    let query = { userName: req.body.userName }


    let savedState = {
        $set: {
            id: randomKey.generate(),
            userName: req.body.userName,
            gridState: gridArray
        }
    }

    let options = {
        upsert: true,
        returnNewDocument: true
    };


    req.app.locals.db.collection('savedPaints').findOneAndUpdate(query, savedState, options)
        .then(updatedDocument => {
            if (updatedDocument) {
                console.log(`Successfully updated document: ${updatedDocument}.`)
            } else {
                console.log("No document matches the provided query.")
            }
            return updatedDocument
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))

    console.log('rad 82', savedState);


    res.json('Bild sparad. Klicka på Visa Bildgalleri för att se din sparade bild.');
});


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


io.on('connection', function (socket) {
    console.log('user ' + socket.id + ' connected');
    // for (connectedSocket in io.sockets.connected) {
    //     console.log('users: ', connectedSocket)
    // }
    // console.log("socket connect: ", io.sockets.connected);
    console.log(io.engine.clientsCount);

    let socketId = socket.id
    io.to(socket.id).emit("socketId", socketId);

    io.emit("grid change", gridArray);

    socket.on("disconnect", () => {
        console.log(io.engine.clientsCount);
        if (io.engine.clientsCount === 0) {
            console.log("no users online!");
            countdown = 1;
            for (grid in gridArray) {
                gridArray[grid].color = null;
            }
        }
        // console.log("socket connect: ", io.sockets.connected);
        console.log("user " + socket.id + " disconnected ");
        for (color in colors) {
            if (colors[color].player === socket.id) {
                colors[color].player = null;
                colors[color].taken = false;
                console.log("colorArray", colors);
            }
        }
    })


    //Handles sent chat messages
    socket.on("chat msg", msg => {
        console.log("msg", msg);
        io.emit("chat msg", msg)
    })
    //Handles clicks on gameboard
    socket.on("grid click", click => {
        for (grid in gridArray) {
            if (gridArray[grid].id === click.coordinates) {
                gridArray[grid].color = click.playerColor;
            }
        }
        io.emit("grid change", gridArray);

    });

    socket.on("empty grid", empty => {
        for (grid in gridArray) {
            gridArray[grid].color = null;
        }
        io.emit("empty grid", gridArray);
    });

    socket.on("startTimer", function (data) {
        if (start == false) {
            countdown = 10;
            io.sockets.emit('timer', { countdown: countdown });
        }
        start = true;
    });

    socket.on("startGame", data => {
        console.log("test", data);
        io.emit("startGame", data);
    });

    socket.on("printScore", scoreObject => {
        console.log("scoreObject från en klient", scoreObject);
        io.emit("printScore", scoreObject);
    });
});


app.post('/colors', function (req, res, next) {
    let chosenColor;
    for (color in colors) {
        if (colors[color].taken === false) {
            chosenColor = { color: colors[color].color };
            // console.log('chosen rad 241', chosenColor);
            colors[color].taken = true;
            colors[color].player = req.body.playerId;
            break;
        }
    }
    // console.log('rad 258', chosenColor);
    if (chosenColor == undefined) {
        // console.log('rad 260', chosenColor);
        res.json({ color: "none" })
    } else {
        // console.log('chosen rad 263', chosenColor);
        res.json(chosenColor);
    }
});

let fetchedRandomPic;
app.get('/random', (req, res) => {

    //asigns random int 0-4 to let
    let generatedRandomInt = randomInt(0, 4);

    console.log("random int", generatedRandomInt);

    //fetches all items from collection
    req.app.locals.db.collection("images").find().toArray()
    .then(results => {
        // console.log(results[generatedRandomInt]);

        //chooses the pic in the fetched array corresponding to the randomly generated number above.
        fetchedRandomPic = results[generatedRandomInt];
        // let fetchedRandomPic = results[0];
        console.log(fetchedRandomPic);
        //emits the chosen pic to front.
        io.emit("random pic", fetchedRandomPic)
        res.json(fetchedRandomPic);
        
    })
});

// app.get('/getRandomPic', (req, res) =>{
//     console.log(fetchedRandomPic);
//     res.json(fetchedRandomPic);
// });

let begin = false;
app.get('/startGame', (req, res) => {
    console.log('game started!');
    begin = true;
    countdown = 100;
    console.log(countdown);
    // io.emit("start klicked", start);
    timer();
    res.json(begin);
    // io.sockets.emit('timer', { countdown: countdown });
})

app.get('/printGameMode', (req, res) => {
    if(begin === true){
        io.emit("start klicked", start);
    }
})


app.post('/checkFacitPicture', (req, res) =>{
    res.json(req.body);
});

app.get('/gridState', (req, res) => {
    res.json({ gridArray: gridArray })
})


module.exports = { app: app, server: server };