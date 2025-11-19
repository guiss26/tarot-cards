//Footer.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (

        <Box sx={{ bgcolor: '#1f1f1f', color: '#F8F8F2', p: '50px', textAlign: 'center'}}>
            <Typography>Proyecto realizado por Guissella Pérez dentro del Bootcamp de Desarrollo Web Fullstack e iniciación a Devops, P4 FemCoders de Factoría F5</Typography>
            <Typography>© 2025 TarotApp · Que las cartas te guíen ✨</Typography>
        </Box>
    )
}

export default Footer;