//Aquí va el home --- cards page
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Sparkles } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen.jsx';
// import { createTheme } from "@mui/material/styles";
// import theme from "./context/Theme.jsx"
import CardList from './components/CardList.jsx';
import { Link as RouterLink } from "react-router-dom";
import { styled } from '@mui/material';

const VideoContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: -1,
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.3)", // o tu overlay
}));

const BackgroundVideo = styled("video")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

function App() {
  const [count, setCount] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Video de fondo global */}
      {/* <VideoContainer>
        <BackgroundVideo autoPlay loop muted playsInline>
          <source src="public/cielo_estrellado.mp4" type="video/mp4" />
        </BackgroundVideo>

        <VideoOverlay />
      </VideoContainer> */}

      <Box>
        <Typography component="span" sx={{ my: 3, fontSize: '13px', color: '#434543' }}>Selecciona una carta para ver su detalle</Typography>
        
        <CardList></CardList>
      </Box>
    </>
  )
}

export default App
