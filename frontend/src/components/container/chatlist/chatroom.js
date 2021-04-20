/* eslint-disable no-unused-vars */
import React, {useEffect }from 'react';
import WebSocketInstance from '../../../websocket';
import defaultimg from '../utils/default.png';
import { useSelector } from 'react-redux';


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



export default function ChatRoom(props) {
    const csrftoken = getCookie('csrftoken')
    const data = {name: 'chat_hello'}

    const chatInfo = useSelector(state => {
        return {
            username: state.authenticate.username,
            rooms: state.chatroom.room_list
        }
    })

    const loadMessages = (e) => {
        const roomid = e.target.id
        if (roomid) {
           props.ws_conn.fetchMessages(roomid)
        }
        
    }
    const roomlist = chatInfo.rooms.map(room => {
        return(
            <a className="conversation active" id={room.id} key={room.id} onClick={e => loadMessages(e)}>
                <img height="20px" width="40px" src={defaultimg} alt="" />
                <div className="title-text"> 
                    {room.room_name}
                </div>
                <div className="created-date">
                    Apr 16
                </div>
                <div className="conversation-message">
                    This a message sggsa adasdadgrefd dsdwdw fd
                </div>
            </a>
        )
    })

    return roomlist
}

export function NewChatRoom() {
    return(
        <div id="new-message-container">
            <a href="/">+</a>
        </div>
    )
}
