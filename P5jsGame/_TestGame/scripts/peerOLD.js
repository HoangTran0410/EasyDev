var lastPeerId = null;
var peer = null; // own peer object
var conn = null;

/**
 * Create the Peer object for our end of the connection.
 *
 * Sets up callbacks that handle any events related to our
 * peer object.
 */

function init() {
  // Create own peer object with connection to shared PeerJS server
  peer = new Peer(null, {
    debug: 3
  });

  peer.on('open', function (id) {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
      console.log('Received null id from peer open');
      peer.id = lastPeerId;
    } else {
      lastPeerId = peer.id;
    }

    console.log('ID: ' + peer.id);
  });

  peer.on('disconnected', function () {
    console.log('Connection lost. Please reconnect')

    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId
    peer._lastServerId = lastPeerId
    peer.reconnect()
  });

  peer.on('close', function () {
    conn = null
    console.log('Connection destroyed')
  });

  peer.on('error', function (err) {
    console.log(err)
    alert('' + err)
  });
}

/**
 * Create the connection between the two Peers.
 *
 * Sets up callbacks that handle any events related to the
 * connection and data received on it.
 */

function join(id) {
  // Close old connection
  if (conn) {
    conn.close()
  }

  // Create connection to destination peer specified in the input field
  conn = peer.connect(id, {
    reliable: true
  })

  conn.on('open', function () {
    console.log("Connected to: " + conn.peer);

    // Check URL params for comamnds that should be sent immediately
    var command = getUrlParam("command");
    if (command)
      conn.send(command);
  });

  // Handle incoming data (messages only since this is the signal sender)
  conn.on('data', function (data) {
    switch (data) {

    }
  });
  conn.on('close', function () {
    console.log("Connection closed");
  });
}

/**
 * Get first "GET style" parameter from href.
 * This enables delivering an initial command upon page load.
 *
 * Would have been easier to use location.hash.
 */

function getUrlParam(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if (results == null)
    return null;
  else
    return results[1];
};

/**
 * Send a signal via the peer connection and add it to the log.
 * This will only occur if the connection is still alive.
 */
function signal(sigName) {
  if (conn && conn.open) {
    conn.send(sigName);
    console.log(sigName + " signal sent");
    addMessage(cueString + sigName);
  } else {
    console.log('Connection is closed');
  }
}


init()

// document.getElementById('connectBtn')
//   .addEventListener('click', function () {

//     console.log('clicked')

//     let id = document.getElementById('inpId').value
//     connect(id)
//   })