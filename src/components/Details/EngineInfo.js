import React from 'react';
import DataBox from "../Common/DataBox";
import {Grid} from "@mui/material";


function EngineInfo({details}) {

    return (
        <Grid container justify={'center'} alignItems={'center'} alignContent={'center'} spacing={3}>
            <Grid item xs={6}>
                <DataBox value={0} title={'Speed'} units={'MPH'} min={0} max={140} limit={80}/>
            </Grid>
            <Grid item xs={6}>
                <DataBox value={details.revs.val} title={'Engine Speed'} units={'RPM'} min={0} max={5000} limit={800}/>
            </Grid>
            <Grid item xs={6}>
                <DataBox value={0} title={'Coolant Temp'} units={'°C'} min={0} max={120} limit={100}/>
            </Grid>
            <Grid item xs={6}>
                <DataBox value={0} title={'Oil Temp'} units={'°C'} min={'0'} max={120} limit={100}/>
            </Grid>
        </Grid>
    )
}

export default EngineInfo
