import React from 'react'

const initialState = {
    isAuth: false,
    username: undefined,
    authFormType: ''
}

export default function authReducer(state=initialState, action) {
    switch(action.type) {
        case "auth/authLoggedIn": {
            return({
                ...state,
                isAuth: localStorage.getItem('token') ? true : false,
                username: action.payload
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