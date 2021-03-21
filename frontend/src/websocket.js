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
        const path = 'ws://127.0.0.1:8000/ws/chat/test';
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log('open connection');
        }

        this.socketRef.onmessage = e => {
            // sending message
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
        if (command === 'messages') {
            this.callbacks[command](parsedData.messages);
        }
        if (command === 'new_message') {
            this.callbacks[command](parsedData.message);
        }
    } 
    fetchMessages(username) {
        this.sendMessage({ command: 'fetch_messages', username: username });
        
    }
    newChatMessages(message) {
        this.sendMessage({ 
            command: 'fetch_messages', 
            from: message.from, 
            message: message.content 
        });
    }
    addCallbacks(messagesCallback, newMessagesCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.clalbacks['new_message'] = newMessageCallback;
    }

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
        setTimeOut (
            function () {
                if (socket.readyState === 1) {
                    console.log('connection is secure');
                    if (callback != null) {
                        console.log('connection is secure');
                        if (callback != null) {
                            callback();
                        }
                        return
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