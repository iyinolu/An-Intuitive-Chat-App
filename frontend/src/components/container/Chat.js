/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import paperclip from './utils/paperclip.svg';
import wastebin from './utils/trash.svg';
import defaultimg from './utils/default.png';
import WebSocketInstance, { WebSocketService } from '../../websocket';
import ChatRoomList from './chatlist/chatroomlist'
import Search from './search/chatsearch';
import ChatArea from './chatarea/ChatArea';
import { NewChatRoom } from './chatlist/chatroom';
import ChatTitle from './navigation/chattitle';
import MessageInput from './textinput/messageinput';
import { useDispatch, connect} from 'react-redux';
import store from '../../store'


class Chat extends React.Component {

    constructor(props) {
        super(props)
        
        // this.waitForSocketConnection(() => {
        //     WebSocketInstance.addCallbacks(
        //         this.setMessages.bind(this),
        //         this.addMessage.bind(this),
        //         this.addChatRooms.bind(this));
        //     WebSocketInstance.fetchRooms(this.props.username)
        // });
    }    
    // addChatRooms(rooms) {
    //     this.props.addChatRoom(rooms)
    // }
    // addMessage(message) {
    //     //TODO: call appropriate dispatch function
    // }
    // setMessages(messages) {
    //     //TODO: call appropriate dispatch function
    // }

    // waitForSocketConnection(callback) {
    //     const component = this;
    //     setTimeout (
    //         function () {
    //             if (WebSocketInstance.state() === 1) {
    //                 console.log('connection is secure');
    //                 callback();
    //                 return;            
    //             }
    //             else {
    //                 console.log('waiting for connection')
    //                 component.waitForSocketConnection(callback);
    //             }
    //         }, 100);
    // };

    render() {
        return (
            <div id="chat-container">
                {/* chat sidepanel section */}
                <Search />
                {/* start new chat section */}
                <NewChatRoom />
                {/* chat section header */}
                <ChatTitle />
                {/* chat sidepanel section */}
                <ChatRoomList />
                {/* chat content section */}
                <ChatArea />
                {/* chat input section */}
                <MessageInput />
            </div>
        )
    }
}


export default Chat