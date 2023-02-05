import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import './App.css';
import Nav from './components/Nav'
import SwipeableNav from './components/SwipeableNav'
import { io } from "socket.io-client";

const socket = io("ws://localhost:3001");

function App() {
    const [value, setValue] = React.useState(0);
    const [view, setView] = React.useState('Vehicle')
    const [socketConnected, setSocketConnected] = React.useState(socket.connected)
    const [time, setTime] = React.useState({minutes: 0, seconds: 0})

    useEffect(() => {
        socket.on('connect', () => {
            setSocketConnected(true);
        });

        socket.on('disconnect', () => {
            setSocketConnected(false);
        });

        socket.on('time', (data) => {
            setTime(prevState => ({...prevState, ...data}))
        })
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            {view}
        </p>
          <p>
              {time.minutes}
          </p>
          <p>
              {time.seconds}
          </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        {view === "Carplay" ? <SwipeableNav setView={setView}/> : <Nav setView={setView}/>}
    </div>
  );
}

export default App;
