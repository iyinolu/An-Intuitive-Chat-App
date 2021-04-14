/* eslint-disable no-unused-vars */
import React from 'react';
import wastebin from '../utils/trash.svg'


export default function ChatTitle(props) {
    return(
        <div id="chat-title">
            <span> Default Chat </span>
            <img src={wastebin} alt="Delete Conversation" />
        </div>
    )
}