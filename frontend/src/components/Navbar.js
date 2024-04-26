import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Typography } from '@mui/material';

export default function Navbar() {
  const HomePage = () => {
    window.location = '/'
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Button onClick={()=> HomePage()} color="inherit">Home</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}