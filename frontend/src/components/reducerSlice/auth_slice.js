import React from 'react'

const initialState = {
    isAuth: false,
    username: null,
    authFormType: '',
    id: null 
}

export default function authReducer(state=initialState, action) {
    switch(action.type) {
        case "auth/authLoggedIn": {
            console.log(action.payload)
            return({
                ...state,
                isAuth: localStorage.getItem('token') ? true : false,
                id: action.payload.id,
                username: action.payload.username,

            })
        }
        case "auth/authFormChange": {
            console.log(action.payload)
            return ({
                ...state,
                authFormType: action.payload
            })
        }
        default: {
            return state;
        }
    }
}