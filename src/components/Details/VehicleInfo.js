import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Grid, Box} from "@mui/material";
import checkPage from "../../utils";
import DataBoxSingleLine from "../common/DataBoxSingleLine";
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import EngineInfo from "./EngineInfo";

function VehicleInfo({socket}) {
    const [details, setDetails] = useState({
        revs: {
            pre: 'Revs',
            suf: 'rpm',
            val: 0
        },
        tripMpg: {
            pre: 'Trip Miles Per Gallon',
            suf: 'mpg',
            val: 0
        },
        tripAvg: {
            pre: 'Trip Avg Speed',
            suf: 'mph',
            val: 0
        },
        tripDistance: {
            pre: 'Distance',
            suf: 'miles',
            val: 0
        },
        tripRange: {
            pre: 'Range',
            suf: 'Miles',
            val: 0
        }
    })

    useEffect(() => {
        socket.on('revs', (data) => {
            setDetails(prevState => ({
                ...prevState,
                revs: {...prevState.revs, val: data.revs}
            }))
        })

        return () => {
            socket.off('revs')
        }
    }, [])

        return (
            <Box display={'flex'} size={100} justifyContent={'space-between'} flexDirection={'column'} flexGrow={1}>
                <SwipeableViews>
                    <EngineInfo details={details}/>
                </SwipeableViews>
                <Grid container justifyContent={'space-around'}>
                    <DataBoxSingleLine data={details.tripMpg} />
                    <DataBoxSingleLine data={details.tripAvg} />
                    <DataBoxSingleLine data={details.tripDistance}/>
                    <DataBoxSingleLine data={details.tripRange}/>
                </Grid>
            </Box>

        );
}

export default VehicleInfo;