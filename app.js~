
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

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
var js ="";
var html="";
var css="";
io.sockets.on('connection', function (socket) {
  io.sockets.emit('js', { data: js });
  io.sockets.emit('css', { data: css });
  io.sockets.emit('html', { data: html });
  socket.on('updatejs', function (data) {
    js = data.my;
    //emits to all - broadcast
    socket.broadcast.emit('js', { data: js });
  });
  socket.on('updatecss', function (data) {
    css = data.my;
    //emits to all - broadcast
    socket.broadcast.emit('css', { data: css });
  });
  socket.on('updatehtml', function (data) {
    html = data.my;
    //emits to all - broadcast
    socket.broadcast.emit('html', { data: html });
  });
  socket.on('run', function (data) {
    socket.broadcast.emit('startRun', { data: html });
  });
});

