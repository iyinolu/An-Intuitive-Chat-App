class WebSocketService {

    static instance = null;
    callbacks = {};
    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }
    constructor() {
        this.socketRef = null;
    }

    state() {
        return this.socketRef.readyState;
    }

    connect(room) {
        if (room) {
            console.log('room')
            this.path = `ws://127.0.0.1:8000/ws/chat/${room}/`;
        }
        else {
            console.log('No room')
            this.path = 'ws://127.0.0.1:8000/ws/chat/';
        }
        this.socketRef = new WebSocket(this.path)
        
        this.socketRef.onopen = () => {
            console.log('open connection');
        }
        this.socketNewMessage(JSON.stringify({
            command: 'fetch_messages'
        }))
    
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)
        }
        this.socketRef.onclose = () => {
            console.log('websocket is closed');
            this.connect()
        }
        this.socketRef.onerror = e => {
            console.log(e.message);
        }
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === 'messages') {
            this.callbacks[command](parsedData.messages);
        }
        if (command === 'new_message') {
            this.callbacks[command](parsedData.messages);
        }
        if (command === 'add_chatroom') {
            console.log(parsedData.rooms)
            this.callbacks[command](parsedData.rooms)
        }
    } 
  
    fetchMessages(roomid) {
        this.sendMessage({
            command: 'fetch_messages', 
            room: roomid, 
        });  
    }

    fetchRooms(username) {
        this.sendMessage({
            command: 'fetch_chat_rooms',
            username: username
        })
    }

    newChatMessages(message) {
        this.sendMessage({ 
            command: 'new_message', 
            from: message.from,
            message: message.content 
        });
    }

    addCallbacks(messagesCallback, newMessageCallback, chatRoomsCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
        this.callbacks['add_chatroom'] = chatRoomsCallback;
    }

    sendMessage(data) {
        try {
            console.log(this.callbacks)
            this.socketRef.send(JSON.stringify(data))
        }
        catch (err) {
            console.log(err);
        }
    }

    waitForSocketConnection(callback) {
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout (
            function () {
                if (socket.readyState === 1) {
                    console.log('connection is secure');
                    if (callback != null) {
                        console.log('connection is secure');
                        if (callback != null) {
                            callback();
                        }
                        return;
                    } else {
                        console.log('waiting for connection')
                        recursion(callback);
                    }
                }
            }, 1);
    }
}




const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;