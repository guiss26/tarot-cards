import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routerTarot from './router/Router.jsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from './context/Theme.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={routerTarot}></RouterProvider>
    </ThemeProvider>
  </StrictMode>,
)
