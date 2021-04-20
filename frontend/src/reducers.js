/* eslint-disable no-unused-vars */
import React from 'react';
import { combineReducers } from 'redux';
import authReducer from './components/reducerSlice/auth_slice'
import chatReducer from './components/reducerSlice/chat_slice'

const rootReducer = combineReducers({
    authenticate: authReducer,
    chatroom: chatReducer,
    currentroom: localStorage.getItem('chat_room')
})

export default rootReducer;