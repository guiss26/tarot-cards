import { Box, Typography } from '@mui/material';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import { motion, AnimatePresence  } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    useEffect(() => {
        sessionStorage.setItem('hasVisitedWelcome', 'true');
        
        const timer = setTimeout(() => {
            setShow(false);
          
            setTimeout(() => {
                navigate('/home', { replace: true });
            }, 800); 
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 9999,
                        backgroundColor: 'black'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom,rgb(68, 51, 34),rgb(34, 26, 17), #000)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            style={{
                                position: 'relative', display: 'flex', justifyContent: 'center'
                            }}
                        >
                            {/* Bola de cristal */}
                            <motion.div
                                style={{
                                    position: 'relative',
                                    width: '280px',
                                    height: '280px',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 254, 250, 0.95) 20%, rgba(255, 253, 245, 0.9) 50%, rgba(255, 252, 240, 0.85) 100%)',
                                    boxShadow:
                                        'inset 0 0 50px rgba(255, 255, 255, 0.5),' +
                                        'inset 20px 0 80px rgba(255, 255, 255, 0.4),' +
                                        'inset -20px 0 80px rgba(255, 196, 0, 0.3),' +
                                        'inset 20px 0 300px rgba(255, 255, 255, 0.3),' +
                                        'inset -20px 0 300px rgba(128, 64, 0, 0.3),' +
                                        '0 0 50px rgba(255, 255, 255, 0.3),' +
                                        '-10px 0 80px rgba(255, 255, 255, 0.2),' +
                                        '10px 0 80px rgba(128, 60, 0, 0.2)',
                                    overflow: 'hidden',
                                }}
                                animate={{
                                    boxShadow: [
                                        `inset 0 0 50px rgba(255, 255, 255, 0.3), inset 0 20px 80px rgba(255, 254, 250, 0.25), inset 0 -20px 80px rgba(250, 245, 240, 0.25), inset 20px 0 80px rgba(255, 254, 248, 0.25), inset -20px 0 80px rgba(245, 240, 230, 0.25), 0 0 70px rgba(255, 255, 255, 0.25), 0 35px 90px rgba(255, 255, 250, 0.2), 0 -15px 60px rgba(255, 255, 250, 0.15)`,
                                        `inset 0 0 65px rgba(255, 255, 255, 0.4), inset 0 25px 100px rgba(255, 255, 252, 0.35), inset 0 -25px 100px rgba(252, 248, 245, 0.35), inset 25px 0 100px rgba(255, 255, 250, 0.35), inset -25px 0 100px rgba(250, 245, 240, 0.35), 0 0 90px rgba(255, 255, 255, 0.35), 0 45px 110px rgba(255, 255, 252, 0.3), 0 -20px 75px rgba(255, 255, 252, 0.2)`,
                                        `inset 0 0 50px rgba(255, 255, 255, 0.3), inset 0 20px 80px rgba(255, 254, 250, 0.25), inset 0 -20px 80px rgba(250, 245, 240, 0.25), inset 20px 0 80px rgba(255, 254, 248, 0.25), inset -20px 0 80px rgba(245, 240, 230, 0.25), 0 0 70px rgba(255, 255, 255, 0.25), 0 35px 90px rgba(255, 255, 250, 0.2), 0 -15px 60px rgba(255, 255, 250, 0.15)`,
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                {/* Reflejo interno */}
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        top: '15%',
                                        left: '20%',
                                        width: '40%',
                                        height: '40%',
                                        borderRadius: '50%',
                                        background: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.9) 0%, transparent 70%)',
                                        filter: 'blur(2px)',
                                    }}
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />

                                {/* Brillo interno */}
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        background: 'radial-gradient(circle at 40% 40%, transparent 30%, rgba(136, 119, 103, 0.1) 70%)',
                                        borderRadius: '50%',
                                    }}
                                    animate={{
                                        opacity: [0.2, 0.5, 0.2],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </motion.div>

                            {/* Base de la bola */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    bottom: '-20px',
                                    transform: 'translateX(-50%)',
                                    width: '150px',
                                    height: '35px',
                                    background: 'linear-gradient(to bottom, #250902,rgb(66, 38, 22),rgb(71, 54, 39))',
                                    borderRadius: '10px',
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 1 }}
                            />

                            {/* Texto */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    bottom: '-100px',
                                    transform: 'translateX(-50%)',
                                    whiteSpace: 'nowrap',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 3,
                                        color: '#f5f3ff',
                                    }}
                                >
                                    <SparklesIcon sx={{ width: 24, height: 24, color: '#d4af37' }} />
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: '1.5rem',
                                            fontWeight: 500,
                                            color: '#d1bea9'
                                        }}
                                    >
                                        Descubre lo que el tarot tiene para ti
                                    </Typography>
                                    <SparklesIcon sx={{ width: 24, height: 24, color: '#d4af37' }} />
                                </Box>
                            </motion.div>
                        </motion.div>

                        {/* Partículas mágicas */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    width: Math.random() * 8 + 2 + 'px',
                                    height: Math.random() * 8 + 2 + 'px',
                                    background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#fef3c7' : '#fde68a'
                                        }, ${Math.random() > 0.5 ? '#fbbf24' : '#f59e0b'})`,
                                    borderRadius: '50%',
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    filter: 'blur(1px)',
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    x: [0, (Math.random() - 0.5) * 20, 0],
                                    opacity: [0.2, 0.9, 0.2],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

