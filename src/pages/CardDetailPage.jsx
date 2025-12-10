//CardDetailPage.jsx para el detalle de cartas de la lectura

import { getOneCard } from '../services/TarotServices'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Container,
    CardContent,
    Button,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImageWithFallback from "../components/ImageWithFallback.jsx";

const StyledCard = styled(Paper)(({ theme }) => ({
    background: 'rgba(49, 40, 30, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: 15,
    padding: theme.spacing(4),
    border: '1.5px solid rgba(0, 0, 0, 0.3)',
    boxShadow: '0px 8px 32px rgba(23, 23, 23, 0.3)',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
    width: '300px',
    height: '100%',
    aspectRatio: '2/3',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[8],
    border: '2px solid rgba(27, 27, 27, 0.3)',
}));

const GoddessImageContainer = styled(Box)(({ theme }) => ({
    width: '300px', 
    height: '100%',
    aspectRatio: '3/4',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[8],
    border: '2px solid rgba(27, 27, 27, 0.3)',
}));

const BackButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg,rgb(82, 73, 60) 30%,rgb(90, 74, 54) 90%)',
    color: 'white',
    padding: theme.spacing(1.5, 4),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 20px rgba(30, 30, 30, 0.5)',
    '&:hover': {
        background: 'linear-gradient(45deg,rgb(56, 50, 41) 30%,rgb(70, 58, 43) 90%)',
        transform: 'scale(1.05)',
        transition: 'all 0.3s ease',
    },
}));

const CardDetailPage = (cardId, onBack) => {
    const { id } = useParams() 
    const [oneCard, setOneCard] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const handleBack = () => {
        navigate("/")
    }

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const data = await getOneCard(id)
                setOneCard(data)
            } catch (error) {
                console.error('Error cargando la carta: ', error)
            } finally {
                setLoading(false) 
            }
        }

        fetchCard() 
    }, [id]) 

    if (loading) return <></> 
    if (!oneCard) return <p>No se encontró la carta</p> 

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Título */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 8,
                        opacity: 0,
                        animation: 'fadeInDown 0.6s ease forwards',
                        '@keyframes fadeInDown': {
                            '0%': { opacity: 0, transform: 'translateY(-20px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            color: 'primary.contrastText',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            fontWeight: 600,
                        }}
                    >
                        <AutoAwesomeIcon sx={{ color: '#f5d776', fontSize: 32 }} />
                        {oneCard.arcaneName}
                        <AutoAwesomeIcon sx={{ color: '#f5d776', fontSize: 32 }} />
                    </Typography>
                </Box>

                {/* Cards */}
                <Box container sx={{ mb: 8, maxWidth: '100%', mx: 'auto', display: 'flex', gap: 4 }}>
                    {/* Card Izquierda - Carta del Tarot */}
                    <Box sx={{ width: '100%' }}>
                        <StyledCard
                            sx={{
                                opacity: 0,
                                transform: 'translateX(-50px)',
                                animation: 'slideInLeft 0.6s ease 0.2s forwards',
                                '@keyframes slideInLeft': {
                                    '0%': { opacity: 0, transform: 'translateX(-50px)' },
                                    '100%': { opacity: 1, transform: 'translateX(0)' },
                                },
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h3"
                                sx={{
                                    color: 'white',
                                    mb: 4,
                                    textAlign: 'center',
                                    fontWeight: 600,
                                }}
                            >
                                Tarot
                            </Typography>

                            <ImageContainer sx={{ textAlign: 'center', alignItems: 'center' }}>
                                <ImageWithFallback
                                    src={oneCard.arcaneImage.imageSrc}
                                    alt={oneCard.arcaneName}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </ImageContainer>
                            <CardContent sx={{
                                px: 1, height: '200px', overflowY: 'auto', '&::-webkit-scrollbar': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                }
                            }}>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{ color: 'white', mb: 2 }}
                                >
                                    Significado
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8, fontSize: '14px', textAlign: 'initial' }}
                                >
                                    {oneCard.arcaneDescription}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Box>

                    {/* Card Derecha - Diosa Contemporánea */}
                    <Box sx={{ width: '100%' }}>
                        <StyledCard
                            sx={{
                                opacity: 0,
                                transform: 'translateX(50px)',
                                animation: 'slideInRight 0.6s ease 0.4s forwards',
                                '@keyframes slideInRight': {
                                    '0%': { opacity: 0, transform: 'translateX(50px)' },
                                    '100%': { opacity: 1, transform: 'translateX(0)' },
                                },
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h3"
                                sx={{
                                    color: 'white',
                                    mb: 4,
                                    textAlign: 'center',
                                    fontWeight: 600,
                                }}
                            >
                                Diosa Contemporánea
                            </Typography>
                            <GoddessImageContainer>
                                <ImageWithFallback
                                    src={oneCard.goddessImage.imageSrc}
                                    alt={oneCard.goddessName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </GoddessImageContainer>
                            <CardContent sx={{
                                px: 1, height: '250px', overflowY: 'scroll', '&::-webkit-scrollbar': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                }
                            }}>
                                <Typography
                                    variant="h5"
                                    component="h4"
                                    sx={{ color: 'white', mb: 2 }}
                                >
                                    {oneCard.goddessName}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8, fontSize: '14px', textAlign: 'initial' }}
                                >
                                    {oneCard.goddessDescription}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Box>
                </Box>

                {/* Botón Volver */}
                <Box 
                    sx={{
                        textAlign: 'center',
                        opacity: 0,
                        animation: 'fadeIn 0.6s ease 0.6s forwards',
                        '@keyframes fadeIn': {
                            '0%': { opacity: 0 },
                            '100%': { opacity: 1 },
                        },
                    }}
                >
                    <BackButton
                        variant="contained"
                        onClick={handleBack}
                        startIcon={<ArrowBackIcon />}
                    >
                        Volver a Cartas
                    </BackButton>
                </Box>
            </Container>
        </>
    )
}

export default CardDetailPage

