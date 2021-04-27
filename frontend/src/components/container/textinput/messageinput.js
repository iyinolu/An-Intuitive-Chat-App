import React, { useState } from 'react';
import paperclip from '../utils/paperclip.svg';
import { useSelector, useDispatch } from 'react-redux';


export default function MessageInput(props) {
    const [message, setMessage] = useState({text: ''}) 
    const dispatch = useDispatch()   
    const [current_room, username] = useSelector(state => {
        return [state.chatroom.current_room, state.authenticate.username]
    })

    const room_connection = useSelector(state => {
        if (current_room) {            
            const room = state.chatroom.room_list.filter(room => room.id === current_room)
            return room[0].connection
        }
        else {
            return state 
        }
    })
    const waitForSocketConnection = (callback) => { 
        if (room_connection.state() === 1) {
            callback()
            return;
        }
        else {
            room_connection.connect()
            setTimeout (() => {
                if (room_connection.state() === 1) {
                    console.log('connection is secure');
                    callback();
                    return;            
                }
                else {
                    console.log('waiting for connection')
                    waitForSocketConnection(callback);
                }
            }, 100);
        }
        
    };

    const messageChangeHandler = e => {
        setMessage({text: e.target.value})
    }
    
    const sendMessageHandler = e => {
        e.preventDefault();
        console.log(current_room)
        console.log(message)
        const messageObject = {
            room: current_room,
            username: username,
            content: message.text
        }
        console.log(message.text)
        // dispatch({type:'chat/chatSendMessage', payload: message.text})
        waitForSocketConnection(() => {
            room_connection.newChatMessages(messageObject)
            e.target.reset()
        })
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