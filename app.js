var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var saveRouter = require('./routes/save');

const MongoClient = require('mongodb').MongoClient;

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

//array that represents the gameboard. Updates with each grid click.
let gridArray = []
let info;
for (let r=1; r<16; r++) {
    for (let c=1; c<16; c++) {
        info = {id: `y${r}x${c}`, color: null};
        gridArray.push(info);
    }   
};

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on("disconnect", () => {
        console.log("user disconnected ");
    })
    //Handles sent chat messages
    socket.on("chat msg", msg => {
        console.log("msg", msg);
        io.emit("chat msg", msg)
    })
    //Handles clicks on gameboard
    socket.on("grid click", click => {
        // console.log("coordinates", click.coordinates);
        // console.log("playerColor", click.playerColor);

        for (grid in gridArray){
            if (gridArray[grid].id === click.coordinates){
                // console.log('Clicked grid', gridArray[grid].id);
                gridArray[grid].color = click.playerColor;
            };
        };

        io.emit("grid change", gridArray);

    });
});




module.exports = { app: app, server: server };
