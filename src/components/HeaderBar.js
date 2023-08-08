import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import robobank from '../images/robo-logo.png';

/*  
This file is the header component. As of now hamburger menu is not implemented

@author : Suraj Behera

*/

export default function HeaderBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <div title='This menu is not available now'>
          <MenuIcon />
           </div>
          </IconButton>
          <img src={robobank} style={{width: 80, height: 80}} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}