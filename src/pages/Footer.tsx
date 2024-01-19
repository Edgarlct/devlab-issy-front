import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center', p: 2 }}>
            <Typography variant="body2">
                © 2023 Ville Présentation
            </Typography>
        </Box>
    );
}

export default Footer;
