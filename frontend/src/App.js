import './App.css';
import React, { useEffect } from 'react';
import Chat from './components/container/Chat'; 
import WebSocketInstance from './components/websocket';

function App() {
  useEffect( () => {
    WebSocketInstance.connect();
  }, [] )
  
  return (
    <Chat />
  );
}

export default App;
