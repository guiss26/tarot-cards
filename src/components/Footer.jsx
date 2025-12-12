import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (

        <Box sx={{ bgcolor: 'rgba(15, 14, 14, 0.7)', color: '#F8F8F2', p: '2%', textAlign: 'center', marginTop: 'auto'}}>
            <Typography sx={{ fontSize: '13px'}}>Proyecto realizado por Guissella Pérez dentro del Bootcamp P4 FemCoders Fullstack, Factoría F5</Typography>
            <Typography sx={{ fontSize: '13px'}}>© 2025 TarotApp · Que las cartas te guíen ✨</Typography>
        </Box>
    )
}

export default Footer;