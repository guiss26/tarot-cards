//Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Box from '@mui/material/Box';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ flex: 1}}>
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}

export default Layout