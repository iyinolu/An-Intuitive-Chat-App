import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './authenticate/login';
import Signup from './authenticate/signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Auth() {
    return (
        <Router>
            <div>
                <Route path='/' exact component={Login} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
            </div>
        </Router>
    )
}

