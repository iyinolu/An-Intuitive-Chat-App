import './App.css';
import React, { useEffect } from 'react';
import Chat from './components/container/Chat'; 
import WebSocketInstance from './websocket';

function App() {
  useEffect( () => {
    WebSocketInstance.connect();
  }, [] )
  
  return (
    <Chat currentuser='admin' />
  );
}

export default App;
