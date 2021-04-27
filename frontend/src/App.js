import './App.css';
import React, { useEffect } from 'react';
import Auth from './components/container/Auth';
import Chat from './components/container/Chat'; 
import WebSocketInstance from './websocket';
import { useSelector } from 'react-redux'


function App() {
  const isLoggedIn = useSelector(state => state.authenticate.isAuth)
  
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     // WebSocketInstance.connect('second_room');
  //   }
  // })
  
  const chatWindow = <Chat currentuser='admin' />
  const authWindow = <Auth />
  return <div> {isLoggedIn ? chatWindow : authWindow} </div>
}

export default App;
