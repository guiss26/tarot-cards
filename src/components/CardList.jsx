//CardList.jsx lista de las cartas. Falta funcionalidad
//CardsGrid.jsx
import CardItem from "./CardItem"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    alpha,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { getAllCards } from '../services/TarotServices.jsx' //CONTINUAR POR DETALLE DE CARTA
import ImageWithFallback from "./ImageWithFallback.jsx";
import { useNavigate } from "react-router-dom";

const CardList = ({ onCardClick }) => {
    const [visibleCards, setVisibleCards] = useState(0)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

    const [tarotCards, setTarotCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Calcular columnas según el breakpoint
    const getColumns = () => {
        if (isMobile) return 2;
        if (isTablet) return 3;
        if (isLaptop) return 5;
        return 5;
    };

    const columns = getColumns();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                const data = await getAllCards()
                console.log('Cartas cargadas desde API: ', data)
                
                setTarotCards(data);
                setError(null);
            } catch (error) {
                console.error('Error al cargar cartas tarot:', error);
                setError('No se pudieron cargar las cartas');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Animación de aparición DESPUÉS de cargar las cartas
    useEffect(() => {
        if (!loading && tarotCards.length > 0) {
            const interval = setInterval(() => {
                setVisibleCards((prev) => {
                    if (prev < tarotCards.length) {
                        return prev + 1;
                    }
                    clearInterval(interval);
                    return prev;
                });
            }, 150);

            return () => clearInterval(interval);
        }
    }, [loading, tarotCards.length]);

    const handleCardClick = (cardId) => {
        navigate(`/detalle-carta/${cardId}`);
    };

    // Estado de carga
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #6366f1',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ fontSize: '18px', color: '#666' }}>
                    Cargando cartas del tarot...
                </p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Estado de error
    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}>
                <p style={{ fontSize: '18px', color: '#ef4444' }}>{error}</p>
            </div>
        );
    }

    // Sin cartas
    if (tarotCards.length === 0) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}>
                <p style={{ fontSize: '18px', color: '#666' }}>
                    No hay cartas disponibles
                </p>
            </div>
        );
    }


    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1400,
                    mx: 'auto',
                    px: { xs: 2, sm: 3, md: 8 },
                    py: 8
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: 3,
                        width: '100%'
                    }}
                >
                   
                    {tarotCards.map((card, index) => {
                        const isVisible = index < visibleCards;

                        return (
                            <div
                                key={card.id}
                                onClick={() => handleCardClick(card.id)}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible
                                        ? 'translateY(0) rotateY(0)'
                                        : 'translateY(50px) rotateY(90deg)',
                                    transition: 'all 0.6s ease-out',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                }}
                            >
                                <div style={{
                                    position: 'relative',
                                    aspectRatio: '2/3',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '2px solid #8b7355',
                                    boxShadow: '0 8px 32px rgba(79, 70, 229, 0.3)',
                                    backgroundColor: '#1a1a2e',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {/* Imagen de la carta */}
                                    <img
                                        src="/base-card-tarot.PNG"
                                        alt={`Carta ${card.name || 'del tarot'} boca abajo`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                        onError={(e) => {
                                            console.error('Error cargando imagen');
                                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23374151" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%23fff" text-anchor="middle" dominant-baseline="middle"%3ETarot%3C/text%3E%3C/svg%3E';
                                        }}
                                    />

                                    {/* Overlay con gradiente */}
                                    <div
                                        className="card-overlay"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(to top, rgba(79, 70, 229, 0.5), transparent 70%)',
                                            opacity: 0.4,
                                            transition: 'opacity 0.3s ease',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </Box>
            </Box>
        </>
    )
}

export default CardList