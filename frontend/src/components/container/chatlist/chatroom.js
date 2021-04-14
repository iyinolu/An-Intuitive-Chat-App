/* eslint-disable no-unused-vars */
import React from 'react';
import defaultimg from '../utils/default.png';

function ChatRoom(props) {
    return (
        <div className="conversation active">
            <img height="20px" width="40px" src={defaultimg} alt="" />
            <div className="title-text">
                {props.text || '@DEV_Name'}
            </div>
            <div className="created-date">
                Apr 16
            </div>
            <div className="conversation-message">
                This a message sggsa adasdadgrefd dsdwdw fd
            </div>
        </div>
    )
}

export function NewChatRoom() {
    return(
        <div id="new-message-container">
            <a href="/">+</a>
        </div>
    )
}

export default ChatRoom;