var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const randomInt = require('./randomInt');
const randomKey = require('random-key');

const cors = require("cors");

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

//Timer som kör igång när start game klickas. Kallas i /startGame.
function timer() {
    let countdownTimer = setInterval(function () {
        countdown--;
        io.sockets.emit("timer", { countdown: countdown });
        if (countdown == 0) {
            clearInterval(countdownTimer);
            gameBegin = false;
            io.emit("timesUp", countdown);
        }
    }, 1000);
}
//Slumpad facitbild. Byts ut i /random varje gång någon klickar på start game.
let fetchedRandomPic;

//Håller koll på om spelet är igång eller ej. Sätts till true i /startGame när man klickar på start game.
let gameBegin = false;

app.get('/stopTime', function (req, res, next) {
    countdown = 1;
    //clearInterval(countdownTimer);
    res.end();
});

// Save picture to db
app.post('/', function (req, res, next) {

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


    res.json('Bild sparad. Klicka på Visa Bildgalleri för att se din sparade bild.');
});



io.on('connection', function (socket) {

    let socketId = socket.id
    io.to(socket.id).emit("socketId", socketId);

    io.emit("grid change", gridArray);

    socket.on("disconnect", () => {
        if (io.engine.clientsCount === 0) {
            countdown = 1;
            for (grid in gridArray) {
                gridArray[grid].color = null;
            }
        }
        for (color in colors) {
            if (colors[color].player === socket.id) {
                colors[color].player = null;
                colors[color].taken = false;
            }
        }
    })


    //Handles sent chat messages
    socket.on("chat msg", msg => {
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


    socket.on("startGame", data => {
        io.emit("startGame", data);
    });

    socket.on("late login", () => {
        io.to(socket.id).emit("random pic", fetchedRandomPic);

    })
});


app.post('/colors', function (req, res, next) {
    let reply = { color: undefined };
    for (color in colors) {
        if (colors[color].taken === false) {
            reply = { color: colors[color].color, started: gameBegin };
            colors[color].taken = true;
            colors[color].player = req.body.playerId;
            break;
        }
    }
    if (reply.color == undefined) {
        res.json({ color: "none" })
    } else {
        res.json(reply);
    }
});

app.get('/random', (req, res) => {

    //asigns random int 0-4 to let
    let generatedRandomInt = randomInt(0, 4);

    //fetches all items from collection
    req.app.locals.db.collection("images").find().toArray()
        .then(results => {

            //chooses the pic in the fetched array corresponding to the randomly generated number above.
            fetchedRandomPic = results[generatedRandomInt];

            //emits the chosen pic to front.
            io.emit("random pic", fetchedRandomPic)
        })
    res.end();
});


app.get('/startGame', (req, res) => {
    gameBegin = true;
    countdown = 100;
    timer();
    res.end();
})

app.get('/printGameMode', (req, res) => {
    if (begin === true) {
        io.emit("start klicked", start);
    }
    res.end();
})


app.post('/checkFacitPicture', (req, res) => {
    res.json(req.body);
});

app.get('/gridState', (req, res) => {
    res.json({ gridArray: gridArray })
})

app.get('/correctImg', (req, res) => {

    const total = 225;
    let sum = 0;

    for (pixel in gridArray) {

        if (gridArray[pixel].color !== null && gridArray[pixel].color === fetchedRandomPic.gridState[pixel].color) {
            sum++;
        }
    }
    let scorePercentage = Math.floor(sum * 100 / total);
    io.emit("printScore", scorePercentage);
    res.end();
})


module.exports = { app: app, server: server };