import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import Nav from './components/Nav'
import SwipeableNav from './components/SwipeableNav'
import {Container} from "@mui/material";
import { io } from "socket.io-client";
import {Carplay} from  "react-js-carplay";
import Vehicle from "./components/Vehicle";
import Settings from "./components/Settings";
import {Box} from "@mui/material";
// const socket = io("ws://localhost:3001");
const {ipcRenderer} = window;

function Home() {
    const [value, setValue] = React.useState(0);
    const [view, setView] = React.useState('Carplay')
    // const [socketConnected, setSocketConnected] = React.useState(socket.connected)
    const [time, setTime] = React.useState({minutes: 0, seconds: 0})
    const [settings, setSettings] = React.useState({})
    const [fps, setFps] = React.useState(null)


    useEffect(() => {
        let fpsTemp = ipcRenderer.sendSync('fpsReq')
        setFps(fpsTemp)
        // socket.on('connect', () => {
        //     setSocketConnected(true);
        // });
        //
        // socket.on('disconnect', () => {
        //     setSocketConnected(false);
        // });
        //
        // socket.on('time', (data) => {
        //     setTime(prevState => ({...prevState, ...data}))
        // })
        return () => {
            // socket.off('connect');
            // socket.off('disconnect');
            // socket.off('time')
        };
    }, [])

    const touchEvent = (type, x, y) => {
        ipcRenderer.send('click', {type: type, x: x, y: y})
    }

    const dummy = () => {
        console.log('dummmy')
    }

    const renderView = () => {
        switch(view) {
            case 'Carplay':
                return fps != null ? <Carplay settings={{fps: fps}} status={true} touchEvent={touchEvent} openModal={false} openModalReq={dummy} closeModalReq={dummy} type={"ws"}/> : <div></div>
            case 'Vehicle':
                return <Vehicle key={'vehicle'}/>
            case 'Settings':
                return <Settings key={'settings'}/>
            default:
                return <Vehicle />
        }
    }

    return (

            <Container maxWidth={false} disableGutters sx={{height: '100%', maxHeight: '100%', overflow: 'hidden'}}>
                {renderView()}
                {view === "Carplay" ? <SwipeableNav setView={setView}/> : <Nav setView={setView}/>}
            </Container>
    );
}

export default Home;
