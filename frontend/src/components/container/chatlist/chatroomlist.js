import defaultimg from '../utils/default.png'
import React from 'react';
import ChatRoom from './chatroom'
import WebSocketService2 from '../../../websocket2';
import {connect} from 'react-redux'


class ChatRoomList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    } 
    componentDidMount() {
        fetch(`http://localhost:8000/chatroom/${this.props.username}/`, {
            method: 'GET',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }  
        })
        .then(res => res.json())
        .then(json => {
            if (json.length > 0) { 
                json.map(room => {
                    room['connection'] = new WebSocketService2(room.room_name)
                    this.setState({rooms: json})
                })
            }
            console.log(json)
            this.props.addChatRooms(json)            
        })   
    }
    render() {
        console.log(this.state)
        if (this.state.rooms instanceof Array) {
            this.chatList = this.state.rooms.map(room => {
                return(
                    <ChatRoom room_info = {room} key={room.id}/>
                )
            })
        }
        else {
            this.chatList = ''
        }
        return(
            <div id="conversation-list">
                {this.chatList}
            </div>
        )
    }
}
                    
const mapDispatchToProps = dispatch => ({
    recieveMessages: chatrooms => {
        dispatch({type:'chat/chatAddNewMessage', payload: chatrooms })
    },
    addMessages: messages => {
        dispatch({type:'chat/chatLoadMessages', payload: messages})
    },
    addChatRooms: rooms => {
        if (rooms instanceof Array){
            dispatch({type:'chat/chatAddRooms', payload: rooms})
        }
    },
    addConnections: connection => {
        dispatch({type: 'chat/chatAddConnection', payload: connection})
    },
    connectChatRooms: () => {
        dispatch({type: 'chat/chatConnectChats', payload:''})
    }
})

const mapStateToProps = state => {
    return {
        username : state.authenticate.username,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomList)