import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Login(props) {
    const [state, setState] = useState({
        username: '',
        password: '',
    })
    const dispatch = useDispatch()

    const handle_login = (e, data) => {
        e.preventDefault()
        console.log(e)
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            if (!json.non_field_errors) {
                localStorage.setItem('token', json.token)
                dispatch({type: 'auth/authLoggedIn', payload: json.user.username})
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
            <form onSubmit={e => handle_login(e, state)}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    value={state.username}
                    onChange={handle_change}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    value={state.password}
                    onChange={handle_change}
                />
                <input type='submit'></input>
            </form> 
            <p>Dont have an account? <Link to='/signup'>sign up</Link></p>
        </div>
    )
}