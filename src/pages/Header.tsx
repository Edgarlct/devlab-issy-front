import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Header: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Tabs
                variant="fullWidth" // Utilisez "scrollable" si vous avez beaucoup d'onglets
                indicatorColor="secondary"
                textColor="inherit"
            >
                <Tab label="Accueil" href="#accueil" />
                <Tab label="Histoire" href="#histoire" />
                <Tab label="Tourisme" href="#tourisme" />
            </Tabs>
        </AppBar>
    );
}

export default Header;
