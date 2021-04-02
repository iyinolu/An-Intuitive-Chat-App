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

    connect() {
        const path = 'ws://127.0.0.1:8000/ws/chat/hello/';
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log('open connection');
        }
        this.socketNewMessage(JSON.stringify({
            command: 'fetch_messages'
        }))
        // Recieve server response and calls appropriate fn with the recieved data
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

        if (Object.keys(this.callbacks).length == 0) {
            return;
        }
        // get state messages
        if (command === 'messages') {
            this.callbacks[command](parsedData.messages);
        }
        // update state messages
        if (command === 'new_message') {
            this.callbacks[command](parsedData.messages);
        }
    } 
    // get previous messages from server
    // 1. Send fetch message command (Starting point triggered by chat.js constructor)
    fetchMessages(username) {
        this.sendMessage({
            command: 'fetch_messages', 
            username: username, 
            message: 'fetching message' 
        });  
    }
    // handles new chat inputs
    newChatMessages(message) {
        this.sendMessage({ 
            command: 'new_message', 
            from: message.from, 
            message: message.content 
        });
    }
    // add callback functions for sending and fetch messages for each instance of ws connection
    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }
    // send message over websocket connection
    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify(data))
        }
        catch (err) {
            console.log(err);
        }
    }
    state() {
        return this.socketRef.readyState;
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