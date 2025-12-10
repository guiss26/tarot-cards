//ReadingPage.jsx
import { useState, useRef, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Card,
    CardMedia,
    Button,
    IconButton,
    Modal,
    Paper,
    CircularProgress,
    Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getAllCards } from '../services/TarotServices.jsx'
import ImageWithFallback from "../components/ImageWithFallback.jsx";

const StyledCard = styled(Paper)(({ theme }) => ({
    background: 'rgba(49, 40, 30, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
    border: '1.5px solid rgba(0, 0, 0, 0.3)',
    marginBottom: theme.spacing(6),
    maxWidth: 700,
    margin: '0 auto 5% auto',
}));

const PositionCard = styled(Paper)(({ theme }) => ({
    aspectRatio: '2/3',
    borderRadius: 10,
    overflow: 'hidden',
    border: '2px solid rgba(0, 0, 0, 0.3)',
    boxShadow: theme.shadows[8],
    backgroundColor: 'rgba(51, 47, 45, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%'

}));

const CarouselCard = styled(Paper)(({ theme, selected }) => ({
    aspectRatio: '2/3',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    border: selected ? '3px solid rgba(14, 14, 14, 0.3)' : '2px solid rgba(0, 0, 0, 0.3)',
    boxShadow: theme.shadows[4],
    cursor: 'pointer',
    flexShrink: 0,
    width: 160,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[12],
    },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    maxWidth: 1200,
    // margin: '0 auto',
    margin: '0 5%',
    marginBottom: theme.spacing(4),
}));

const CarouselWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    paddingBottom: theme.spacing(2),
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
}));

const NavButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#332d27',
    color: 'white',
    zIndex: 10,
    '&:hover': {
        backgroundColor: '#9C27B0',
    },
    boxShadow: theme.shadows[6],
    width: 40,
    height: 40,
}));

const FinishButton = styled(Button)(({ theme, disabled }) => ({
    padding: theme.spacing(1.5, 4),
    borderRadius: theme.spacing(2),
    background: disabled
        ? '#757575'
        : 'linear-gradient(45deg,rgb(82, 73, 60) 30%,rgb(90, 74, 54) 90%)',
    color: 'white',
    boxShadow: disabled ? 'none' : '0 4px 20px rgba(30, 30, 30, 0.5)',
    '&:hover': {
        background: disabled ? '#757575' : 'linear-gradient(45deg,rgb(56, 50, 41) 30%,rgb(70, 58, 43) 90%)',
        transform: disabled ? 'none' : 'scale(1.05)',
    },
    transition: 'all 0.3s ease',
    minWidth: 200,
}));

const ModalContent = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(to bottom, #4A148C, #311B92)',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(6),
    border: '2px solid rgba(156, 39, 176, 0.5)',
    boxShadow: theme.shadows[24],
    maxWidth: 1200,
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    outline: 'none',
}));

const ReadingPage = () => {
    const [tarotCards, setTarotCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [currentPosition, setCurrentPosition] = useState('Pasado');
    const [selectedCards, setSelectedCards] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true)
                const data = await getAllCards()
                console.log('Cartas cargadas para lectura: ', data)
                setTarotCards(data)
                setError(null)
            } catch (error) {
                console.log('Error al cargar cartas: ', error)
                setError('No se pudieron cargar las cartas del tarot')
            } finally {
                setLoading(false)
            }
        }

        fetchCards()
    }, [])

    const handleCardSelect = (card) => {
        const newSelection = {
            position: currentPosition,
            card,
        };

        setSelectedCards([...selectedCards, newSelection]);

        // Cambiar a siguiente posición
        if (currentPosition === 'Pasado') {
            setCurrentPosition('Presente');
        } else if (currentPosition === 'Presente') {
            setCurrentPosition('Futuro');
        }
    };

    const handleFinishReading = () => {
        setShowResults(true);
    };

    const handleCloseResults = () => {
        setShowResults(false);
        setSelectedCards([]);
        setCurrentPosition('Pasado');
    };

    const getCardForPosition = (position) => {
        return selectedCards.find((sc) => sc.position === position);
    };

    const positions = ['Pasado', 'Presente', 'Futuro'];

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 300;
            const newPosition =
                direction === 'left'
                    ? scrollPosition - scrollAmount
                    : scrollPosition + scrollAmount;

            carouselRef.current.scroll({
                left: newPosition,
                behavior: 'smooth',
            });
            setScrollPosition(newPosition);
        }
    };

    const isCardSelected = (cardId) => {
        return selectedCards.some(sc => sc.card.id === cardId);
    };

    // ✅ MOSTRAR LOADING MIENTRAS CARGA
    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: 'primary.light' }}>
                        Preparando las cartas del tarot...
                    </Typography>
                </Box>
            </Container>
        );
    }

    // ✅ MOSTRAR ERROR SI FALLA LA CARGA
    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Typography variant="h6" sx={{ color: 'error.main' }}>
                    {error}
                </Typography>
            </Container>
        );
    }

    // ✅ MOSTRAR MENSAJE SI NO HAY CARTAS
    if (tarotCards.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Typography variant="h6" sx={{ color: 'primary.light' }}>
                    No hay cartas disponibles para la lectura
                </Typography>
            </Container>
        );
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 5, px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Título */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 6,
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
                        sx={{
                            color: '#52463b',
                            mb: 3,
                            fontWeight: 600,
                        }}
                    >
                        Lectura del Tarot
                    </Typography>
                    <Typography
                        // variant="h5"
                        sx={{ color: '#434543' }}
                    >
                        ¿Qué energías te rodean? Escoge una carta para:{' '}
                        <Box component="span" sx={{ color: '#d4af37' }}>
                            {currentPosition}
                        </Box>
                    </Typography>
                </Box>

                {/* Box con espacios para las 3 cartas */}
                <StyledCard
                    sx={{
                        opacity: 0,
                        scale: 0.9,
                        animation: 'scaleIn 0.6s ease forwards',
                        '@keyframes scaleIn': {
                            '0%': { opacity: 0, scale: 0.9 },
                            '100%': { opacity: 1, scale: 1 },
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4}}>
                        {positions.map((position) => {
                            const selectedCard = getCardForPosition(position);
                            return (
                                <Box>
                                    <Box sx={{ textAlign: 'center'}}>
                                        <PositionCard >
                                            {selectedCard ? (
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        opacity: 0,
                                                        animation: 'rotateIn 0.6s ease forwards',
                                                        '@keyframes rotateIn': {
                                                            '0%': { opacity: 0, transform: 'rotateY(90deg)' },
                                                            '100%': { opacity: 1, transform: 'rotateY(0)' },
                                                        },
                                                    }}
                                                >
                                                    <ImageWithFallback
                                                        src="/base-card-tarot.PNG"
                                                        alt="Carta seleccionada"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </Box>
                                            ) : (
                                                <AutoAwesomeIcon sx={{ fontSize: 48, color: 'rgba(142, 124, 43, 0.3)' }} />
                                            )}
                                        </PositionCard>
                                        <Typography
                                            variant="h6"
                                            sx={{ color: '#d4af37', mt: 2 }}
                                        >
                                            {position}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </StyledCard>

                {/* Carrusel de cartas */}
                <CarouselContainer>
                    {/* Botón Izquierda */}
                    <NavButton
                        onClick={() => scroll('left')}
                        sx={{ left: -56 }}
                    >
                        <ArrowBackIcon />
                    </NavButton>

                    {/* Carrusel */}
                    <CarouselWrapper ref={carouselRef}>
                        {tarotCards.map((card) => {
                            const selected = isCardSelected(card.id);
                            return (
                                <CarouselCard
                                    key={card.id}
                                    selected={selected}
                                    onClick={() => {
                                        if (selectedCards.length < 3 && !selected) {
                                            handleCardSelect(card);
                                        }
                                    }}
                                    sx={{
                                        opacity: selectedCards.length >= 3 && !selected ? 0.5 : 1,
                                        cursor: selectedCards.length >= 3 && !selected ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    <ImageWithFallback
                                        src='/base-card-tarot.PNG'
                                        alt="Carta de tarot"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {selected && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                backgroundColor: 'rgba(156, 39, 176, 0.9)',
                                                borderRadius: '50%',
                                                width: 32,
                                                height: 32,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                {positions.findIndex(p =>
                                                    selectedCards.some(sc => sc.position === p && sc.card.id === card.id)
                                                ) + 1}
                                            </Typography>
                                        </Box>
                                    )}
                                </CarouselCard>
                            );
                        })}
                    </CarouselWrapper>

                    {/* Botón Derecha */}
                    <NavButton
                        onClick={() => scroll('right')}
                        sx={{ right: -56 }}
                    >
                        <ArrowForwardIcon />
                    </NavButton>
                </CarouselContainer>

                {/* Botón Finalizar Lectura */}
                <Box sx={{ textAlign: 'center' }}>
                    <FinishButton
                        onClick={handleFinishReading}
                        disabled={selectedCards.length < 3}
                    >
                        {selectedCards.length < 3 ? (
                            `Selecciona ${3 - selectedCards.length} carta(s) más`
                        ) : (
                            'Finalizar Lectura'
                        )}
                    </FinishButton>
                </Box>

                {/* Modal de Resultados */}
                <Modal
                    open={showResults}
                    onClose={handleCloseResults}
                    aria-labelledby="tarot-reading-modal"
                    sx={{ backdropFilter: 'blur(4px)' }}
                >
                    <ModalContent>
                        {/* Botón cerrar */}
                        <IconButton
                            onClick={handleCloseResults}
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                backgroundColor: '#7B1FA2',
                                color: 'white',
                                '&:hover': { backgroundColor: '#9C27B0' },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography
                            id="tarot-reading-modal"
                            variant="h3"
                            sx={{
                                color: 'primary.contrastText',
                                textAlign: 'center',
                                mb: 6,
                                fontWeight: 600,
                            }}
                        >
                            Tu Lectura de Tarot
                        </Typography>

                        <Box container spacing={4}>
                            {positions.map((position, index) => {
                                const selectedCard = getCardForPosition(position);
                                if (!selectedCard) return null;

                                return (
                                    <Box item xs={12} md={4} key={position}>
                                        <Box
                                            sx={{
                                                textAlign: 'center',
                                                opacity: 0,
                                                animation: `fadeInUp 0.6s ease ${index * 0.2}s forwards`,
                                                '@keyframes fadeInUp': {
                                                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                                                    '100%': { opacity: 1, transform: 'translateY(0)' },
                                                },
                                            }}
                                        >
                                            <Chip
                                                label={position}
                                                sx={{
                                                    backgroundColor: 'rgba(156, 39, 176, 0.2)',
                                                    color: 'secondary.light',
                                                    fontSize: '1.1rem',
                                                    mb: 3,
                                                    px: 2,
                                                    py: 1,
                                                }}
                                            />

                                            <Box
                                                sx={{
                                                    aspectRatio: '2/3',
                                                    borderRadius: 2,
                                                    overflow: 'hidden',
                                                    border: '2px solid rgba(168, 85, 247, 0.3)',
                                                    boxShadow: 8,
                                                    mb: 3,
                                                    opacity: 0,
                                                    animation: `flipIn 0.8s ease ${index * 0.2 + 0.3}s forwards`,
                                                    '@keyframes flipIn': {
                                                        '0%': { opacity: 0, transform: 'rotateY(180deg)' },
                                                        '100%': { opacity: 1, transform: 'rotateY(0)' },
                                                    },
                                                }}
                                            >
                                                <ImageWithFallback
                                                    src="https://images.unsplash.com/photo-1751712698640-788fa51db5fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJvdCUyMGNhcmQlMjBteXN0aWNhbCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjQ1ODU3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080" //cambiar
                                                    // src={selectedCard.arcaneImage.imageSrc}
                                                    alt={selectedCard.card.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </Box>

                                            <Typography
                                                variant="h5"
                                                sx={{ color: 'primary.light', mb: 2 }}
                                            >
                                                {selectedCard.card.name}
                                            </Typography>

                                            <Typography
                                                variant="body1"
                                                sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}
                                            >
                                                {selectedCard.card.meaning}
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </ModalContent>
                </Modal>
            </Container>
        </>
    )
}

export default ReadingPage