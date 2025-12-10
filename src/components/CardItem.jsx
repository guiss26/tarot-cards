//CardItem.jsx cartas boca abajo

import { Card, Box, CardMedia } from '@mui/material';

const CardItem = () => {
    // funcionalidad que recoge la img de las cartas
    return (
        <>
            <Box sx={{ bgcolor: 'red', width: '100%', my: 5, px: '7%'}}>
                {/* Front */}
                <Card sx={{ width: '200px', height: '300px'}}>
                    <CardMedia component="img" image="/base-card-tarot.PNG" sx={{}}></CardMedia>
                </Card>

                {/* Back */}
                <Card sx={{ width: '200px', height: '300px'}}>
                    <CardMedia componentcode ="img" image=""></CardMedia>
                </Card>
            </Box>

        </>
    )
}

export default CardItem