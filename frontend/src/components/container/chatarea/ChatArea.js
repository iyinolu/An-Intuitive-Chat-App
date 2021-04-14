/* eslint-disable no-unused-vars */
import React from 'react';
import defaultimg from '../utils/default.png';

export default function ChatArea(props) {
    const messages = props.messages

    const renderMessages = (messages) => {
        const currentUser = 'admin';
        if (messages.id === 3) {
            return messages.map(message => (
                <div key={message.id} className={"message-row you-message"}>
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
            ))
        }
        else {
            return messages.map(message => (
                <div key={message.id}
                className={"message-row you-message"}>
                        <div className={"message-content"}>    
                            <div className="message-text">
                                {message.content}
                            </div>
                        <div className={"message-time"}>Apr 16</div>
                    </div>
                </div>
            ))
        }
    };

    return (
        <div id="chat-message-list">
                    {
                        messages &&
                        renderMessages(messages)
                    }
                    <div className="message-row you-message">
                        <div className="message-content">
                            <div className="message-text">ok then</div>
                            <div className="message-time">Apr 16</div>
                        </div> 
                    </div>
                    <div className="message-row other-message">
                        <div className="message-content">
                            <img height="40px" width='40px' src={defaultimg} alt="default user" />
                            <div className="message-text">
                                Yeah I think it's best we do that. Otherwise things won't
                                work well at all. I'm adding more text here to test the sizing
                                of the speech bubble and the wrapping of it too.
                            </div>
                            <div className="message-time">Apr 16</div>
                        </div>
                    </div>
                    <div className="message-row you-message">
                        <div className="message-content">
                            <div className="message-text">ok then</div>
                            <div className="message-time">Apr 16</div>
                        </div> 
                    </div>
                    <div className="message-row other-message">
                        <div className="message-content">
                            <img height="40px" width='40px' src={defaultimg} alt="default user" />
                            <div className="message-text">
                                Yeah I think it's best we do that. Otherwise things won't
                                work well at all. I'm adding more text here to test the sizing
                                of the speech bubble and the wrapping of it too.
                            </div>
                            <div className="message-time">Apr 16</div>
                        </div>
                    </div>
                </div>
    )
}