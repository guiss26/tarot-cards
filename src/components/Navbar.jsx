//Navbar.jsx
import { useState } from 'react'
// import { Link } from 'react-router-dom'
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Menu, MenuIcon } from 'lucide-react';
import { IconButton } from '@mui/material';
import { Height } from '@mui/icons-material';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return(
        <AppBar position="static" sx={{ bgcolor: '#1f1f1f', py: 1}}>
        {/* // <AppBar position="static" sx={{ bgcolor: '#0d0c0c', opacity: 0.75, py: 1}}> */}
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                {/* <IconButton color="inherit" edge="start" onClick={toggleMenu} sx={{ mr: 2 }}><MenuIcon></MenuIcon> </IconButton> */}
                <Link component={RouterLink} to="/" sx={{ fontSize: '25px', fontWeight: 'bold', textDecoration: 'none', color: '#F8F8F2'}}>🔮 TAROT MÍSTICO</Link>
                
                <List component="nav" sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <ListItemButton component={RouterLink} to="/" onClick={() => setIsOpen(false)}>
                        <ListItemText primary="Cartas"></ListItemText>
                    </ListItemButton>
                    <ListItemButton component={RouterLink} to="/lectura-tarot" onClick={() => setIsOpen(false)}>
                        <ListItemText primary="Lectura Tarot"></ListItemText>
                    </ListItemButton>
                </List>
            </Toolbar>
        </AppBar>
        
    )
}

export default Navbar;