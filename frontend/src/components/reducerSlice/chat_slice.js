import React from 'react';
import WebSocketService2 from '../../websocket2';

const initialState = {
    room_list: [],
    messages:{},
    current_room: null,
    room_list_ids:[]
}

export default function chatReducer(state=initialState, action) {
    switch (action.type) {
        case 'chat/chatAddRooms': {
            return ({
                ...state,
                room_list: [
                    ...state.room_list,
                    ...action.payload
                ]
            })
        }
        case 'chat/chatLoadMessages': {
            console.log(action.payload)
            return({
                ...state,
                messages: {
                    ...state.messages,
                    ...action.payload
                }
            })
        }
        case 'chat/chatAddNewMessage': {
            console.log(action.payload)
            return({
                ...state,
                send_fn: action.payload
            })
        }
        case 'chat/chatCurrentRoom': {
            return({
                ...state,
                current_room: action.payload
            })
        }
        case 'chat/chatSendMessage': {
            var id = state.current_room 
            var new_messages = {
                ...state.messages
            }
            new_messages[id] = [
                ...state.messages[id],
                action.payload
            ]
            return({
                ...state,
                messages: new_messages
            })        
        }
        case 'chat/chatAddRoomId': {
            return {
                ...state,
                room_list_ids: [
                    ...state.room_list_ids,
                    action.payload
                ]
            }
        }
        default: {
            return state
        }
    }
}

export function fetchrooms(dispatch, getState) {
    const userid = getState().authenticate.id
    const waitForSocketConnection = (room) => { 
        if (room['connection'].state() === 1) {
            console.log(`${room.room_name} connection is secure`);
            return;
        }
        else {
            room['connection'].connect()
            setTimeout (() => {
                if (room['connection'].state() === 1) {
                    console.log(`${room.room_name} connection is secure`);
                    return;            
                }
                else {
                    console.log('waiting for connection')
                    waitForSocketConnection(room);
                }
            }, 1000);
        }
    };
    fetch(`http://localhost:8000/chatrooms/${userid}/`, {
            method: 'GET',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }  
        })
        .then(res => res.json())
        .then(json => {
            if (json.length > 0) { 
                    json.map(room => {
                        console.log('create connection')
                        room['connection'] = new WebSocketService2(room.room_name)
                        waitForSocketConnection(room)
                        return room
                    }
                ) 
                return json
            }
            else {
                return json
            }    
        })
        .then(rooms => {
            console.log(localStorage.getItem('token'))
            console.log(rooms)
            dispatch({type:'chat/chatAddRooms', payload: rooms})
        })   

}

