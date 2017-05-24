var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3200;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});

io.on('connection', function(socket) {
  socket.on('username', function(username) {
    socket.username = username;
    io.emit('chat message', socket.username + ' has connected');
  })

  socket.on('disconnect', function() {
    io.emit('chat message', socket.username + ' has disconnected');
  });

  socket.on('chat message', function(msg) {
    io.emit('chat message', socket.username + ": " + msg);
  });
});
