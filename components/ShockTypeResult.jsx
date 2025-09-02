// src/components/ShockTypeResult.jsx
import React from 'react';
import { Box, Typography, Paper, Alert, AlertTitle } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing'; // Ícone genérico para tipo de choque

const ShockTypeResult = ({ type, alerts }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <HealingIcon sx={{ mr: 1 }} color="primary" />
          Tipo de Choque Provável
        </Typography>
        <Typography variant="h5" component="p" color="primary.main" fontWeight="500">
          {type}
        </Typography>
      </Paper>
      
      {/* Seção de Alertas, especialmente para o lactato */}
      {alerts && alerts.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {alerts.map((alertMsg, index) => (
            <Alert severity="warning" key={index} sx={{ mt: 1 }}>
              <AlertTitle>Ponto de Atenção</AlertTitle>
              {alertMsg}
            </Alert>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ShockTypeResult;