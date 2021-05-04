/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import defaultimg from '../utils/default.png';
import { useSelector } from 'react-redux';


export default function ChatArea(props) {

    const messages = useSelector(state => state.chatroom.messages[state.chatroom.current_room])
    const userid = useSelector(state => state.authenticate.id)
    const messagesEndRef = useRef(false);

    useEffect(() => {
        if (!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end"})
            messagesEndRef.current = true
        }
        else {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end"})
        }
    })
    const renderMessages = (messages) => {
        const currentUser = 'admin';
        return messages.map(message => {
            if (message.user === userid) {
                return(
                    <div key={message.id}
                    className={"message-row you-message"}>
                        <div className={"message-content"}>    
                            <div className="message-text">
                                {message.content}
                            </div>
                            <div className={"message-time"}>Apr 16</div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div key={message.id} className={"message-row other-message"}>
                        <div className={"message-content"}>
                            <img height="40px" width='40px' src={defaultimg} alt="default user" />
                        <div className="message-text">
                            {message.content}
                        </div>
                        <div className={"message-time"}>
                            Apr 16
                        </div>  
                        </div>
                    </div>
                )
                
            }
        })
    }
    return (
        <div id="chat-message-list">
            <div>
                {
                    messages &&
                    renderMessages(messages)
                }
            <div className = 'message-end' ref={messagesEndRef}></div>
            </div>
        </div>
    )
}