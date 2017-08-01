var peer;

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;


$( document ).ready(function() {
    
	 peer = new Peer(makeid(), {host: 'localhost', port: location.port, path: '/peerjs'});

	 peer.on('open', function(id) {
  		
  		$('#message').html(id);


	});


	 //when peer calls me

	 peer.on('call', function(call) {

	  navigator.getUserMedia({video: true, audio: true}, function(stream) {
	    
	    call.answer(stream); // send them our video stream
	   
	    call.on('stream', function(remoteStream) {
	    	//show their stream 
	      document.getElementById("video").src = window.URL.createObjectURL(stream);
		  document.getElementById("video").play();

	    });

	  }, function(err) {
	    console.log('Failed to get local stream' ,err);
	  });

	});


});


function connect(){

	var otherid = document.getElementById('inputID').value;

	navigator.getUserMedia({video: true, audio: true}, function(stream) {
	    
	    var call = peer.call(otherid, stream); //send them our stream
	   
	    call.on('stream', function(remoteStream) {
	    	//receive their stream when they answer
	      document.getElementById("video").src = window.URL.createObjectURL(stream);
		  document.getElementById("video").play();

	    });

	  }, function(err) {
	    console.log('Failed to get local stream' ,err);
	  });

		
}


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}





