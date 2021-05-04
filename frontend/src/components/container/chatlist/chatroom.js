import React from 'react';
import defaultimg from '../utils/default.png';
import { connect } from 'react-redux';
import MessageInput from '../textinput/messageinput';


function getCookie(name) {
    if (!document.cookie) {
      return null;
    }
    const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));
  
    if (xsrfCookies.length === 0) {
      return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }



class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
    }
    loadMessages() {
        if (!this.props.rooms_id.includes(this.props.room_info.id)) {
            fetch(`http://127.0.0.1:8000/messages/${this.props.room_info.id}`, {
            method: 'GET',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(json => {
            var room_messages = {}
            var roomid = this.props.room_info.id
            room_messages[roomid] = json
            this.props.loadMessage(room_messages)
            this.props.updateCurrentRoom(this.props.room_info.id)
            this.props.addOpenedRoom(this.props.room_info.id)
        })}
        else {
            this.props.updateCurrentRoom(this.props.room_info.id)
        }
        
    }
    render() {
        return(
            <a className="conversation active" id={this.props.room_info.id} onClick ={this.loadMessages.bind(this)}>
            <img height="20px" width="40px" src={defaultimg} alt="" />
            <div className="title-text"> 
                {this.props.room_info.room_name}
            </div>
            <div className="created-date">
                Apr 16
            </div>
            <div className="conversation-message">
                This a message sggsa adasdadgrefd dsdwdw fd
            </div>
        </a>
        )
    }
}
const mapStateToProps = state => {
    return {
        username : state.authenticate.username,
        chatrooms : state.chatroom.room_list,
        rooms_id: state.chatroom.room_list_ids
    }
}
const mapDispatchToProps = dispatch => ({
    loadMessage: (messages) => {
        dispatch({type:'chat/chatLoadMessages', payload: messages})
    },
    updateCurrentRoom: roomId => {
        dispatch({type: 'chat/chatCurrentRoom', payload: roomId})
    },
    addOpenedRoom: id => {
        dispatch({type:'chat/chatAddRoomId', payload:id})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)

export function NewChatRoom() {
    return(
        <div id="new-message-container">
            <a href="/">+</a>
        </div>
    )
}
