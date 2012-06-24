
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer(),
io = require('socket.io').listen(app);


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3000);
var map = [];
app.get('/:id', function (req, res) {
    var id = req.params.id;
    if (id == "favicon.ico") return;
    console.log("id retrieved is " + id);
    if (id.indexOf('javascripts') != -1) {
        res.sendfile(__dirname + '/index.html');
    } else {
        if (typeof map[id] == "undefined") {
            map[id] = {};
            map[id].html = "";
            map[id].js = "";
            map[id].css = "";
            console.log(map);
            io.sockets.on('connection', function (socket) {
                socket.on(id+'updatejs', function (data) {
                    js = data.my;
                    //emits to all - broadcast
                    socket.broadcast.emit(id+'js', { data: js });
                });
                socket.on(id+'updatecss', function (data) {
                    css = data.my;
                    //emits to all - broadcast
                    socket.broadcast.emit(id+'css', { data: css });
                });
                socket.on(id+'updatehtml', function (data) {
                    html = data.my;
                    //emits to all - broadcast
                    socket.broadcast.emit(id+'html', { data: html });
                });
                socket.on(id+'run', function (data) {
                    socket.broadcast.emit(id+'startRun', { data: 'run' });
                });
            });
        } else {
            console.log("reached to else with id = " + id);
             io.sockets.emit(id + 'js', { data: map[id].js });
             io.sockets.emit(id + 'css', { data: map[id].css });
             io.sockets.emit(id + 'html', { data: map[id].html });
        }
        res.sendfile(__dirname + '/index.html');
    }
});


