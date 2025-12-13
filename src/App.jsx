import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import CardList from './components/CardList.jsx';

function App() {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])


  if (showWelcome) {
    return <WelcomeScreen />;
  }

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
