var static = require('node-static');
var file = new static.Server('./public');
var server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});

var io = require('socket.io')(server);
server.listen(3000);

// default clients online
var nClients = 0;
//////////////////////// events
io.sockets.on('connection', (socket)=>{
  nClients++;
  // send the number of clients to client

  // Show all the messages to all users
  socket.on('sendMessage', function(data) {
    io.sockets.emit('newMessage', data);
  });

  socket.on('disconnect',()=>{
    nClients--;
    socket.broadcast.emit('statistics', { n: nClients });
  });
  socket.emit('statistics', { n: nClients });
  socket.broadcast.emit('statistics', { n: nClients });
});

// chat dialog area(all users) and input area (current user)

// save data to file or local storage or on memory
