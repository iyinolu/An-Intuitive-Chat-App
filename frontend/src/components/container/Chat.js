import React from 'react';
import paperclip from './utils/paperclip.svg';
import wastebin from './utils/trash.svg';
import defaultimg from './utils/default.png';
import WebSocketInstance from '../websocket';
import Sidepanel from './sidepanel/Sidepanel';

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
    renderMessages = (messages) => {
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
                <div id="search-container">
                    <input type="text" placeholder="Search" />
                </div>
                
                <div id="new-message-container">
                    <a href="">+</a>

                </div>

                {/* chat section header */}
                <div id="chat-title">
                    <span> Default Chat </span>
                    <img src={wastebin} alt="Delete Conversation" />
                </div>

                <Sidepanel text='hello world'/>

                {/* chat content section */}
                <div id="chat-message-list">
                    {
                        messages &&
                        this.renderMessages(messages)
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
                

                {/* chat input section */}
                
                <form id="chat-form" onSubmit={this.sendMessageHandler}>
                    <a href='#'><img src={paperclip} alt="Add Attachment" /></a>
                    <input 
                        onChange={this.messageChangeHandler}
                        type="text" 
                        placeholder="type a message" 
                        value={this.state.message}
                    />
                    <button type='submit'></button>
                </form>
                
            </div>
        )
    }
}

export default Chat 