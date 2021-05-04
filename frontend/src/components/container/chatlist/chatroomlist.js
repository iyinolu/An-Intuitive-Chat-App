import defaultimg from '../utils/default.png'
import React from 'react';
import ChatRoom from './chatroom'
import WebSocketService2 from '../../../websocket2';
import {connect} from 'react-redux'
import {fetchrooms} from '../../reducerSlice/chat_slice';


class ChatRoomList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    } 
    componentDidMount() {
        this.props.addChatRooms(fetchrooms);
    }
    render() {
        if (this.props.room_list.length > 0) {
            this.chatList = this.props.room_list.map(room => {
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
    addChatRooms: func => {
        dispatch(func)
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
        room_list : state.chatroom.room_list
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomList)