import React, {useEffect} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Container, createMuiTheme, CssBaseline} from "@mui/material"
import {CarplayAudio} from "react-js-carplay";
import Home from "./Home";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});



function App() {
    useEffect(() => {
        console.log("rendering")
    })

    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Home />
            <CarplayAudio />
        </ThemeProvider>
    )
}

export default App