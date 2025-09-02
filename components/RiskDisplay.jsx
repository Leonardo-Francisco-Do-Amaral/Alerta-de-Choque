// src/components/RiskDisplay.jsx
import React from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

const RiskDisplay = ({ percentage, level }) => {
  const getColor = () => {
    if (percentage > 50) return 'error'; // Alto Risco: 51% a 100% [cite: 6]
    if (percentage > 20) return 'warning'; // Risco Moderado: 21% a 50% [cite: 6]
    return 'success'; // Baixo Risco: 10% a 20% [cite: 5]
  };

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', mt: 2 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Risco de Choque
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex', my: 2 }}>
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={120}
          thickness={4}
          color={getColor()}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div" color="text.secondary">
            {`${percentage}%`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h5" sx={{ color: `${getColor()}.main` }}>
        {level}
      </Typography>
    </Paper>
  );
};

export default RiskDisplay;