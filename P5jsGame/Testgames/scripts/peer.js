class PeerControl {
  constructor(config = {}) {

    this.config = config
    this.lastPeerId = null
    this.peer = null
    this.conn = null
  }

  init({ onOpenPeer, onDisconnected, onClosePeer, onError } = {}) {

    // Create own peer object with connection to shared PeerJS server
    this.peer = new Peer(null, {
      ...this.config,
      'iceServers': [
        // { 'url': 'stun:stun.l.google.com:19302' },
        // { 'url': 'stun.l.google.com:19302' },
        // { 'url': 'stun1.l.google.com:19302' },
        // { 'url': 'stun2.l.google.com:19302' },
        // { 'url': 'stun3.l.google.com:19302' },
        // { 'url': 'stun4.l.google.com:19302' },
        // { 'url': 'stun.ekiga.net' },
        // { 'url': 'stun.ideasip.com' },
        // { 'url': 'stun.rixtelecom.se' },
        // { 'url': 'stun.schlund.de' },
        // { 'url': 'stun.stunprotocol.org:3478' },
        // { 'url': 'stun.voiparound.com' },
        // { 'url': 'stun.voipbuster.com' },
        // { 'url': 'stun.voipstunt.com' },
        // { 'url': 'stun.voxgratia.org' },
        {
          url: 'turn:192.158.29.39:3478?transport=udp',
          credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
          username: '28224511:1379330808'
        }
      ],
      debug: 3
    });

    this.peer.on('open', (id) => {
      // Workaround for this.peer.reconnect deleting previous id
      if (this.peer.id === null) {
        console.log('Received null id from peer open');
        this.peer.id = this.lastPeerId;
      } else {
        this.lastPeerId = this.peer.id;
      }

      onOpenPeer && onOpenPeer(this.peer.id)
    });

    this.peer.on('disconnected', () => {
      console.log('Connection lost. Please reconnect')

      onDisconnected && onDisconnected()

      // Workaround for this.peer.reconnect deleting previous id
      if (this.peer.id) {
        this.peer.id = this.lastPeerId
        this.peer._lastServerId = this.lastPeerId
        this.peer.reconnect()
      }
    });

    this.peer.on('close', () => {
      this.conn = null
      console.log('Connection destroyed')

      onClosePeer && onClosePeer()
    });

    this.peer.on('error', function (err) {
      onError && onError(error)
    });
  }

  connectTo(id, { onOpenConnect, onDataReceived, onCloseConnect } = {}) {
    // Close old connection
    if (this.conn) {
      this.conn.close()
    }

    // Create connection to destination peer specified in the input field
    this.conn = this.peer.connect(id, {
      reliable: true
    })

    this.conn.on('open', () => {
      console.log("Connected to: " + this.conn.peer);

      onOpenConnect(this.conn.peer)

      // Check URL params for comamnds that should be sent immediately
      // var command = getUrlParam("command");
      // if (command)
      //   conn.send(command);
    });

    // Handle incoming data (messages only since this is the signal sender)
    this.conn.on('data', function (data) {
      onDataReceived(data)
    });

    this.conn.on('close', function () {
      onCloseConnect()
    });
  }

  send(data) {
    if (this.conn) {
      this.conn.send(data)
    } else {
      alert('Chưa có kết nối thì gửi con mẹ gì !!')
    }
  }
}