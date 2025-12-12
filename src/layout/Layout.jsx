
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Box from '@mui/material/Box';
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
    background: "rgba(0, 0, 0, 0.3)",
}));

const BackgroundVideo = styled("video")(({ theme }) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
}));

const Layout = () => {
    return (
        <>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, mt: 4 }}>
                <VideoContainer>
                    <BackgroundVideo autoPlay loop muted playsInline>
                        <source src="public/cielo_estrellado.mp4" type="video/mp4" />
                    </BackgroundVideo>

                    <VideoOverlay />
                </VideoContainer>
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}

export default Layout