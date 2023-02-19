import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import Nav from './components/Nav'
import SwipeableNav from './components/SwipeableNav'
import {Container, Modal} from "@mui/material";
import { io } from "socket.io-client";
import {Carplay} from  "react-js-carplay";
import Vehicle from "./components/Vehicle";
import Settings from "./components/Settings";
import Dev from './components/Dev'
import {Box} from "@mui/material";
import ParkingSensors from "./components/pam/ParkingSensors";
import Camera from "./components/Camera/Camera";
const socket = io("localhost:3001");
const {ipcRenderer} = window;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '95%',
    width: '95%',
    boxShadow: 24,
    display: "flex"
};

function Home() {
    const [value, setValue] = React.useState(0);
    const [view, setView] = React.useState('Carplay')
    // const [socketConnected, setSocketConnected] = React.useState(socket.connected)
    const [time, setTime] = React.useState({minutes: 0, seconds: 0})
    const [settings, setSettings] = React.useState({})
    const [manualClose, setManualClose] = React.useState(false)
    const [parkingSensors, setParkingSensors] = React.useState({parkingActive: false,
        frontLeft: 0,
        frontLeftMiddle: 0,
        frontRightMiddle: 0,
        frontRight:0,
        rearLeft: 0,
        rearLeftMiddle: 0,
        rearRightMiddle: 0,})
    const [fps, setFps] = React.useState(null)


    useEffect(() => {
        let fpsTemp = ipcRenderer.sendSync('fpsReq')

        setFps(fpsTemp)
        socket.on('connect_error', err => console.log("err"))
        socket.on('error', err => console.log(err))
        socket.on('connect', () => console.log("connected"))
        socket.on('parkingSensors', (data) => {
            setParkingSensors(data)
            if(data.parkingActive === false && manualClose===true) {
                setManualClose(false)
            }
        })
        return () => {
            socket.off('connect');
            // socket.off('disconnect');
            // socket.off('time')
            socket.off('connect_error')
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
                return fps != null ? <Carplay settings={{fps: fps}} status={true} openModal={false} openModalReq={dummy} closeModalReq={dummy} type={"ws"}/> : <div></div>
            case 'Vehicle':
                return <Vehicle key={'vehicle'}/>
            case 'Settings':
                return <Settings key={'settings'}/>
            case 'Dev':
                return <Dev key={'dev'}  socket={socket}/>
            default:
                return <Vehicle />
        }
    }

    return (

            <Container maxWidth={false} disableGutters sx={{height: '100%', maxHeight: '100%', overflow: 'hidden'}}>
                {renderView()}
                {view === "Carplay" ? <SwipeableNav setView={setView}/> : <Nav setView={setView}/>}
                <Modal
                    open={parkingSensors.parkingActive > 0 && manualClose===false}
                    onClick={()=> setManualClose(true)}
                >
                    <Box sx={style}>
                        <Camera />
                        <Box sx={{display: 'flex', alightItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <ParkingSensors
                                sensorFLL={parkingSensors.frontLeft}
                                sensorFCL={parkingSensors.frontLeftMiddle}
                                sensorFCR={parkingSensors.frontRightMiddle}
                                sensorFRR={parkingSensors.frontRight}
                                sensorBLL={parkingSensors.rearLeft}
                                sensorBCL={parkingSensors.rearLeftMiddle}
                                sensorBCR={parkingSensors.rearRightMiddle}
                                sensorBRR={parkingSensors.rearRight}/>
                        </Box>

                    </Box>
                </Modal>
            </Container>
    );
}

export default Home;
