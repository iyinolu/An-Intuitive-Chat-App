import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import { StyledLink } from "baseui/link";
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


export default function Login() {
    const [state, setState] = useState({
        username: '',
        password: '',
        username_error: [false, ''],
        password_error: [false, '']
    })

    const dispatch = useDispatch()

    const handle_login = (e, data) => {
        e.preventDefault()
        axios
            .post('http://127.0.0.1:8000/token_auth/', data)
            .then(res => {
                if (!res.non_field_errors) {
                    localStorage.setItem('token', res.data.token)
                    dispatch({type: 'auth/authLoggedIn', payload:{id: res.data.id, username: res.data.username}})
                }
            })
            .catch(err => {
                console.log(err)
                if (err.response.data.username){
                    setState(prevstate => {
                        const newState = { ...prevstate }
                        newState['username_error'][0] = true
                        newState['username_error'][1] = err.response.data.username
                        return newState
                    })
                }
                if (err.response.data.password) {
                    setState(prevstate => {
                        const newState = { ...prevstate }
                        newState['password_error'][0] = true
                        newState['password_error'][1] = err.response.data.password
                        return newState
                    })
                }
            })
    }

    const handle_change = e => {
        const name = e.target.name
        const value = e.target.value
        setState(prevstate => {
            const newState = { ...prevstate }
            newState[name] = value
            return newState;
        })
    }  

    return (
        <div>
            <Display4 marginBottom='scale1000'>Login</Display4>
            <form onSubmit={e => handle_login(e, state)}>
                <FormControl
                    label={() => "Username"}
                    error={state.username_error[1]}
                >
                    <Input
                        type='text'
                        name='username'
                        value={state.username}
                        onChange={handle_change}
                        placeholder='Username'
                        error={state.username_error[0]}
                        clearOnEscape
                        onFocus={() => {
                            setState(prevstate => {
                                const newState = { ...prevstate }
                                newState['username_error'] = [false, '']
                                return newState;
                            })
                         }}
                    />
                </FormControl>
                
                <FormControl
                    label={() => "Password"}
                    error={state.password_error[1]}
                >
                    <Input
                        type='password'
                        name='password'
                        value={state.password}
                        onChange={handle_change}
                        placeholder='Password'
                        error={state.password_error[0]}
                        onFocus={() => {
                            setState(prevstate => {
                                const newState = { ...prevstate }
                                newState['password_error'] = [false, '']
                                return newState;
                            })
                         }}
                    />
                </FormControl>
                <Button type='submit' startEnhancer={() => <ArrowRight size={24} />}>
                    Submit
                </Button>
            </form> 
            <Paragraph2 marginTop='scale500' >Dont have an account? <Link to='/signup'> <StyledLink >sign up</StyledLink></Link></Paragraph2>
        </div>
    )
}