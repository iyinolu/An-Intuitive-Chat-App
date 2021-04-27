import React from 'react';

const initialState = {
    room_list: [],
    messages: [],
    current_room: null,
    room_list_ids:[]
}

export function chatReducer(state=initialState, action) {
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
                messages: [
                    ...state.messages,
                    ...action.payload
                ]
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
            return({
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            
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
        // case 'chat/chatConnectChats': {
        //     return {
        //         ...state,
        //         room_list: state.room_list.map(room => {
        //             if (room.connection.readyState() !== 1){
        //                 room.connection.connect()
        //                 setTimeout (() => {
        //                     if (room_connection.state() === 1) {
        //                         console.log(`${room.room_name} connection is secure`);
        //                         callback();
        //                         return;            
        //                     }
        //                     else {
        //                         console.log('waiting for connection')
        //                         waitForSocketConnection(callback);
        //                     }
        //                 }, 100);
        //                 return room
        //             }
        //             else {
        //                 return room
        //             }
        //         })
        //     }
        // }

        default: {
            return state
        }
    }
}

export default chatReducer;