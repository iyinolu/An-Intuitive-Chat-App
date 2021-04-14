/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import paperclip from '../utils/paperclip.svg';

export default function MessageInput(props) {
    const [message, setMessage] = useState({text: ''})
    
    const messageChangeHandler = e => {
        setMessage({text: e.target.value})
    }
    const sendMessageHandler = e => {
        e.preventDefault();
        const messageObject = {
            from: 'admin',
            content: message.text
        }
        props.ws_conn.newChatMessages(messageObject)
        e.target.reset()
    }

    return (
        <form id="chat-form" onSubmit={sendMessageHandler}>
            <a href='/'><img src={paperclip} alt="Add Attachment" /></a>
            <input 
                onChange={messageChangeHandler}
                type="text" 
                placeholder="type a message" 
                value={props.message}
            />
            <button type='submit'></button>
        </form>
    )
}