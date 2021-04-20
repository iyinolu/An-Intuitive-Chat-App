import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Signup(props) {
    const [state, setState] = useState({
        username: '',
        password: '',
    })

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
            <form>
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
            </form>     
        </div>
    )
}