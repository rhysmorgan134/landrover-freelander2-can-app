import React, {useState} from 'react'
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function({setView}) {
    const [value, setValue] = useState(false)
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Carplay" icon={<RestoreIcon />} onClick={() => setView('Carplay')}/>
                <BottomNavigationAction label="Vehicle" icon={<FavoriteIcon />} onClick={() => setView('Vehicle')}/>
                <BottomNavigationAction label="Settings" icon={<ArchiveIcon />} onClick={() => setView('Settings')}/>
            </BottomNavigation>
        </Paper>
    )
}