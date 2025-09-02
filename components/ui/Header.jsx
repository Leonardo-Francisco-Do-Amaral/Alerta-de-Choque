// src/components/ui/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Alerta de Choque
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Análise de Risco
          </Button>
          <Button color="inherit" component={RouterLink} to="/sobre">
            Sobre o Projeto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;