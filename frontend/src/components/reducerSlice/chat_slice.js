import React from 'react';

const initialState = {
    room_list: [],
    messages: []
}

export function chatReducer(state=initialState, action) {
    switch (action.type) {
        case 'chat/chatAddRooms': {
            return ({
                ...state,
                room_list: action.payload
            })
        }
        default: {
            return state
        }
    }
}

export default chatReducer;