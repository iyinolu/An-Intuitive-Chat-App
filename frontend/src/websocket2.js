import store from './store'

class WebSocketService2 {
    
    constructor(room_name) {
        this.room_name = room_name;
        this.socketRef = 0;
    }

    callbacks = {};
   
    state() {
        return this.socketRef.readyState;
    }

    connect() {
        this.path = `ws://127.0.0.1:8000/ws/chat/${this.room_name}/`;
        this.socketRef = new WebSocket(this.path)
        
        this.socketRef.onopen = () => {
            console.log(`${this.room_name} has opened connection`);
        }

        this.socketRef.onmessage = e => {
            console.log(e.data)
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

        if (command === 'messages') {
            store.dispatch({type:'', payload:''})
        }
        if (command === 'new_message') {
            const current_room = store.getState().chatroom.current_room
            console.log(current_room)
            if (current_room === parsedData.messages.chatroom){
                store.dispatch({type:'chat/chatSendMessage', payload: parsedData.messages})
            }                
        }
        if (command === 'add_chatroom') {
            store.dispatch({type:'', payload:''})
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
        this.sendMessage(message);
    }

    addCallbacks(recieveMessages, addMessages) {
        this.callbacks['messages'] = recieveMessages;
        this.callbacks['new_message'] = addMessages;
    }

    sendMessage(data) {
        try {
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

export default WebSocketService2;