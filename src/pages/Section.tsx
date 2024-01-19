import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface SectionProps {
    id: string;
    title: string;
    content: string;
}

const Section: React.FC<SectionProps> = ({ id, title, content }) => {
    return (
        <Paper id={id} elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{content}</Typography>
        </Paper>
    );
}

export default Section;
