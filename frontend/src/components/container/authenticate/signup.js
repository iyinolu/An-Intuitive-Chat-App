import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import webemoji from '../utils/webemoji.png'

import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import ArrowRight from 'baseui/icon/arrow-right';
import { FormControl } from "baseui/form-control";
import {
    Display1,
    Display2,
    Display3,
    Display4,
    Paragraph1,
    Paragraph2,
    Paragraph3,
    Paragraph4
  } from 'baseui/typography';


export default function Signup(props) {
    const [state, setState] = useState({
        username: '',
        password: '',
        email: ''
    })

    const dispatch = useDispatch()

    const handle_change = e => {
        const name = e.target.name
        const value = e.target.value
        setState(prevstate => {
            const newState = { ...prevstate }
            newState[name] = value
            return newState;
        })
    }   
    const handle_signup = (e, data) => {
        e.preventDefault()
        const options = {
            'Content-Type': 'application/json'
        }
        axios
            .post('http://127.0.0.1:8000/create_user/', data, options)
            .then(res => {
                if (!res.non_field_errors) {
                    localStorage.setItem('token', res.data.token)
                    dispatch({type: 'auth/authLoggedIn', payload:{id: res.data.id, username: res.data.username}})
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='login-header'>
                <img height='50px' src={webemoji}></img>
                <div className='site-bio'>
                    <h1 className='site-name' marginBottom='scale100'>Welcome to WebChats</h1>
                    <p>Chat on the web!</p>
                </div>
            </div>
            <h2 className='login'>Sign Up</h2>
            <form onSubmit={e => handle_signup(e, state)}>
                <FormControl
                    >
                        <Input
                            type='text'
                            name='email'
                            value={state.email}
                            onChange={handle_change}
                            placeholder='Email'
                        />
                    </FormControl>
                <FormControl
                >
                    <Input
                        type='text'
                        name='username'
                        value={state.username}
                        onChange={handle_change}
                        placeholder='Username'
                    />
                </FormControl>
                <FormControl
                >
                    <Input
                        type='password'
                        name='password'
                        value={state.password}
                        onChange={handle_change}
                        placeholder='Password'
                    />
                </FormControl>
                <Button type='submit' startEnhancer={() => <ArrowRight size={24} />}>
                    Sign Up
                </Button>
            </form>     
        </div>
    )
}