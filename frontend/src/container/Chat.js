import React from 'react';
import paperclip from './utils/paperclip.svg';
import wastebin from './utils/trash.svg';
import defaultimg from './utils/default.png';
import WebSocketInstance from '../websocket';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setMessage.bind(this),
                this.addMessage.bind(this));
            WebSocketInstance.fetchMessage(this.props.currentUser);
        });
    }
    
    addMessage(message) {
        this.setState({
            messages: [this.state.messages, message]
        });
    }

    setMessages(messages) {
        this.setState({
            messages: messages.reverse()
        })
    }
    waitForSocketConnection(callback) {
        const component = this;
        const recursion = this.waitForSocketConnection;
        setTimeOut (
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

    }
    render() {
        return (
            <div id="chat-container">
                <div id="search-container">
                    <input type="text" placeholder="Search" />
                </div>
                <div id="conversation-list">
                    <div className="conversation active">
                        <img height="20px" width="40px" src={defaultimg} alt="" />
                        <div className="title-text">
                            Defaut User agjgergg dsfadf dsafsf dsd ds
                        </div>
                        <div className="created-date">
                            Apr 16
                        </div>
                        <div className="conversation-message">
                            This a message sggsa adasdadgrefd dsdwdw fd
                        </div>
                    </div>
                    <div className="conversation active">
                        <img height="20px" width="40px" src={defaultimg} alt="" />
                        <div className="title-text">
                            Defaut User agjgergg dsfadf dsafsf dsd ds
                        </div>
                        <div className="created-date">
                            Apr 16
                        </div>
                        <div className="conversation-message">
                            This a message sggsa adasdadgrefd dsdwdw fd
                        </div>
                    </div>
                </div>
                <div id="new-message-container">
                    <a href="">+</a>

                </div>

                {/* chat section header */}
                <div id="chat-title">
                    <span> Default Chat </span>
                    <img src={wastebin} alt="Delete Conversation" />
                </div>

                {/* chat content section */}
                <div id="chat-message-list">
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
                <div id="chat-form">
                    <img src={paperclip} alt="Add Attachment" />
                    <input type="text" placeholder="type a message" />
                </div>
            </div>
        )
    }
}

export default Chat 