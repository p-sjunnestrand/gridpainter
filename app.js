var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var saveRouter = require('./routes/save');

const MongoClient = require('mongodb').MongoClient;
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

//array that represents the gameboard. Updates with each grid click.
let gridArray = []
let info;
for (let r=1; r<16; r++) {
    for (let c=1; c<16; c++) {
        info = {id: `y${r}x${c}`, color: null};
        gridArray.push(info);
    }   
};
//array that stores player colors and keeps track of number of players in game
const colors = [
    {"color": "blue", "taken":false, "player": ''},
    {"color": "red", "taken":false, "player": ''},
    {"color": "yellow", "taken":false, "player": ''},
    {"color": "pink", "taken":false, "player": ''}
]

let start = false;
let countdown = 100;
let timer = setInterval(function(){
    countdown--;
    io.sockets.emit("timer", {countdown: countdown});
    if(countdown == 0){
        clearInterval(timer);
        io.emit("timesUp", countdown);
        // Antingen setLocalstorage att timesUp = true och kollarsen i main om den är sann/falsk, om sann kör rättningsfunctionen
        // eller kör rättningsfunctionen direkt här
    }
}, 1000);


io.on('connection', function (socket) {
    console.log('user ' + socket.id + ' connected');

    let socketId = socket.id
    io.to(socket.id).emit("socketId", socketId);

    io.emit("grid change", gridArray);

    socket.on("disconnect", () => {
        console.log("user " + socket.id + " disconnected ");
        for (color in colors){
            if(colors[color].player === socket.id){
                colors[color].player = '';
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
        for (grid in gridArray){
            if (gridArray[grid].id === click.coordinates){
                gridArray[grid].color = click.playerColor;
            };
        };

        io.emit("grid change", gridArray);

    });

    socket.on("startTimer", function(data){
        if(start == false){
            countdown = 100;
        io.sockets.emit('timer', { countdown: countdown });
        }
        start = true; 
    });
});







app.get('/colors');


app.post('/colors', function(req, res, next) {
  console.log('colors!');
  let colorPicked = false;
  for(color in colors){
    console.log(colors[color].color);
    if(colors[color].taken === false){
      console.log(colors[color].color + "color is available!");
      console.log(req.body);
      let chosenColor = {"color": colors[color].color};
      res.json(chosenColor);
      colors[color].taken = true;
      colors[color].player = req.body.playerId;
      console.log('colorArray', colors);
      console.log(colors[color].taken);
      colorPicked = true;

      console.log();
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

module.exports = { app: app, server: server };
