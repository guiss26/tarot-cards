import { useState } from 'react'
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Drawer,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { MenuIcon } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    // Menú para desktop/tablet grande
    const desktopMenu = (
        <List component="nav" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ListItemButton component={RouterLink} to="/home" sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                <ListItemText
                    primary="Cartas"
                    sx={{
                        color: '#F8F8F2',
                        '& .MuiListItemText-primary': {
                            fontWeight: 500
                        }
                    }}
                />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/lectura-tarot" sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                <ListItemText
                    primary="Lectura Tarot"
                    sx={{
                        color: '#F8F8F2',
                        '& .MuiListItemText-primary': {
                            fontWeight: 500
                        }
                    }}
                />
            </ListItemButton>
        </List>
    );

    // Menú para móvil (en Drawer)
    const mobileMenu = (
        <Box
            sx={{
                width: 250,
                height: '100%',
                bgcolor: 'rgba(15, 14, 14, 0.95)',
                display: 'flex',
                flexDirection: 'column'
            }}
            role="presentation"
            onClick={closeMenu}
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={closeMenu} sx={{ color: '#F8F8F2' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List sx={{ px: 2 }}>
                <ListItemButton
                    component={RouterLink}
                    to="/home"
                    onClick={closeMenu}
                    sx={{
                        color: '#F8F8F2',
                        py: 2,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                >
                    <ListItemText
                        primary="Cartas"
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontSize: '1.1rem',
                                fontWeight: 500
                            }
                        }}
                    />
                </ListItemButton>
                <ListItemButton
                    component={RouterLink}
                    to="/lectura-tarot"
                    onClick={closeMenu}
                    sx={{
                        color: '#F8F8F2',
                        py: 2,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                >
                    <ListItemText
                        primary="Lectura Tarot"
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontSize: '1.1rem',
                                fontWeight: 500
                            }
                        }}
                    />
                </ListItemButton>
            </List>
        </Box>
    );

    return (
        <AppBar position="static" sx={{ bgcolor: 'rgba(15, 14, 14, 0.7)', py: 1 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link component={RouterLink} to="/" sx={{ fontSize: { xs: '18px', sm: '22px', md: '25px' }, fontWeight: 'bold', textDecoration: 'none', color: '#F8F8F2', flexGrow: { xs: 1, md: 0 } }}>🔮 TAROT MÍSTICO</Link>

                {/* Menú para desktop/tablet grande */}
                {!isMobile && desktopMenu}

                {/* Botón de menú hamburguesa para móvil */}
                {isMobile && (
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={toggleMenu}
                        sx={{ color: '#F8F8F2' }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Drawer para menú móvil */}
                <Drawer
                    anchor="right"
                    open={isOpen && isMobile}
                    onClose={closeMenu}
                    sx={{
                        '& .MuiDrawer-paper': {
                            bgcolor: 'transparent',
                            backdropFilter: 'blur(10px)'
                        }
                    }}
                >
                    {mobileMenu}
                </Drawer>
            </Toolbar>
        </AppBar>

    )
}

export default Navbar;