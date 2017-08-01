var express = require('express');
var app = express();
var http = require('http').Server(app);
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');

});



app.use(express.static(__dirname));

var options = {
    debug: true
}

app.use('/peerjs', ExpressPeerServer(http, options));


http.on('connection', function(id) { 

		
 });

http.on('disconnect', function(id) { 


});

http.listen(process.env.PORT || 9000, function(){
	console.log('server running');
});