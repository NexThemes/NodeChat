// create a new socket
var socket = io("http://localhost:3000");
var messageForm = jQuery('#submitArea');
var messageBox = jQuery('#textMessage');
var chat = jQuery('#chatArea');
name = prompt('What is your name?')
messageForm.submit(function(e) {
	var time = new Date();
	var timeH = time.getHours();
	var timeM = time.getMinutes();
	var newTime = timeH +':'+ timeM;
	var data = {
		name : name,
		time : newTime,
		mess : messageBox.val()
	}
	e.preventDefault();
	socket.emit('sendMessage', data);
	messageBox.val('');
});
socket.on('newMessage', function(data){
	chat.append("<p><span>" + data.name + ":</span><b>" + data.time + "</b>" + data.mess + "<br/>");
});

// on connected to server
socket.on('connect', function( data ) {
  document.getElementById("connectionStatus").className = "fa fa-chain";
});

// on connected to server
socket.on('statistics', function( data ) {
	document.getElementById("usersOnline").innerHTML = "People online " + data.n;
});

// on disconnect to serve
socket.on('disconnect', function( data ) {
  document.getElementById("connectionStatus").className = "fa fa-chain-broken";
});
