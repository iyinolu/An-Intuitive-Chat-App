/* eslint-disable no-unused-vars */
import React from 'react';
import paperclip from './utils/paperclip.svg';
import wastebin from './utils/trash.svg';
import defaultimg from './utils/default.png';
import WebSocketInstance from '../../websocket';
import ChatRoomList from './chatlist/chatroomlist'
import Search from './search/chatsearch';
import ChatArea from './chatarea/ChatArea';
import { NewChatRoom } from './chatlist/chatroom';
import ChatTitle from './navigation/chattitle';
import MessageInput from './textinput/messageinput';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this));
            WebSocketInstance.fetchMessages(this.props.currentUser);
        });
    }
    addMessage(message) {
        const append_msg = this.state.messages.unshift(message);
        this.setState({
            messages: this.state.messages
        });
    }
    setMessages(messages) {
        this.setState({
            messages: messages.reverse()
        })
    }
    sendMessageHandler = e => {
        e.preventDefault();
        const messageObject = {
            from: 'admin',
            content: this.state.message
        }
        WebSocketInstance.newChatMessages(messageObject);
        this.setState({
            message: ''
        });
    }
    messageChangeHandler = event => {
        this.setState({
            message: event.target.value
        })
    }

    waitForSocketConnection(callback) {
        const component = this;
        const recursion = this.waitForSocketConnection;
        setTimeout (
            function () {
                if (WebSocketInstance.state() === 1) {
                    console.log('connection is secure');
                    callback();
                    return;            
                }
                else {
                    console.log('waiting for connection')
                    component.waitForSocketConnection(callback);
                }
            }, 100);
    };

    render() {
        const messages = this.state.messages;
        return (
            <div id="chat-container">
                {/* chat sidepanel section */}
                <Search />
                {/* start new chat section */}
                <NewChatRoom />
                {/* chat section header */}
                <ChatTitle />
                {/* chat sidepanel section */}
                <ChatRoomList text='hello world'/>
                {/* chat content section */}
                <ChatArea messages={this.state.messages}/>
                {/* chat input section */}
                <MessageInput ws_conn={WebSocketInstance} />
            </div>
        )
    }
}

export default Chat 