import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardList from './components/CardList.jsx';

function App() {
  return (
    <>
      <Box sx={{ pt: 4}}>
        <Typography component="span" sx={{ my: 3, fontSize: '14px', color: '#727572' }}>Selecciona una carta para ver su detalle</Typography>

        <CardList></CardList>
      </Box>
    </>
  )
}

export default App
