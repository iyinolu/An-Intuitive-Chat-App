/* eslint-disable no-unused-vars */
import defaultimg from '../utils/default.png'
import React from 'react';
import ChatRoom from './chatroom'

export default function ChatRoomList(props) {
    return(
        <div id="conversation-list">
            <ChatRoom ws_conn = {props.ws_conn} />
        </div>
    )
}

