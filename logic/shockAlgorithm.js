// src/components/ShockTypeResult.jsx
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Avatar,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';

// Importando ícones relevantes para cada tipo de choque
import {
  Science as ScienceIcon,
  Warning as WarningIcon,
  Bloodtype as SepticIcon, // Ícone sugestivo para sepse/infecção
  Favorite as CardiogenicIcon, // Ícone de coração para cardiogênico
  WaterDrop as HypovolemicIcon, // Ícone de gota para hipovolemia
  HelpOutline as UndeterminedIcon, // Ícone para casos indeterminados
} from '@mui/icons-material';

// Componente para exibir os alertas clínicos de forma mais elegante
const ClinicalAlerts = ({ alerts }) => {
  const theme = useTheme();
  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <Box>
      <Divider sx={{ my: 2, borderColor: alpha(theme.palette.text.primary, 0.1) }} />
      <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ mb: 1.5 }}>
        Pontos de Atenção
      </Typography>
      <Stack direction="row" flexWrap="wrap" spacing={1} gap={1}>
        {alerts.map((alert, index) => (
          <Chip
            key={index}
            icon={<WarningIcon fontSize="small" />}
            label={alert}
            color="warning"
            variant="outlined"
            size="small"
          />
        ))}
      </Stack>
    </Box>
  );
};

const ShockTypeResult = ({ result }) => {
  const theme = useTheme();

  // Mapeamento centralizado para detalhes de cada tipo de choque
  // Facilita a adição de novos tipos e a manutenção do código
  const shockTypeDetails = {
    'Séptico': {
      icon: <SepticIcon />,
      color: theme.palette.error.main,
      description: "Resposta sistêmica a uma infecção, levando à disfunção orgânica.",
    },
    'Cardiogênico': {
      icon: <CardiogenicIcon />,
      color: theme.palette.secondary.main,
      description: "Incapacidade do coração de bombear sangue suficiente para o corpo.",
    },
    'Hipovolêmico': {
      icon: <HypovolemicIcon />,
      color: theme.palette.info.main,
      description: "Perda severa de sangue ou fluidos, resultando em baixo volume sanguíneo.",
    },
    'Indeterminado': {
      icon: <UndeterminedIcon />,
      color: theme.palette.grey[600],
      description: "Os parâmetros atuais não são conclusivos para um tipo específico de choque. Reavaliar o quadro clínico.",
    },
    // Adicione outros tipos de choque aqui (ex: Anafilático, Neurogênico)
  };

  // Se não houver resultado, exibe um estado inicial
  if (!result) {
    return (
      <Box textAlign="center" py={4}>
        <ScienceIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3 }} />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Aguardando a análise dos parâmetros...
        </Typography>
      </Box>
    );
  }

  const { type, alerts } = result;
  const details = shockTypeDetails[type] || shockTypeDetails['Indeterminado'];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        background: `linear-gradient(145deg, ${alpha(details.color, 0.05)} 0%, ${alpha(details.color, 0.02)} 100%)`,
        border: `1px solid ${alpha(details.color, 0.2)}`,
        textAlign: 'center',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Avatar
          sx={{
            width: 72,
            height: 72,
            backgroundColor: details.color,
            color: 'white',
            boxShadow: `0 6px 20px ${alpha(details.color, 0.3)}`,
          }}
        >
          {React.cloneElement(details.icon, { sx: { fontSize: 40 } })}
        </Avatar>

        <Box>
          <Typography variant="h5" fontWeight={700} color={details.color} gutterBottom>
            {type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details.description}
          </Typography>
        </Box>

        <ClinicalAlerts alerts={alerts} />
      </Stack>
    </Paper>
  );
};

export default ShockTypeResult;