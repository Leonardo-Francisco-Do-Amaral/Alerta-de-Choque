// src/pages/Sobre.jsx
import React from 'react';
import { Container, Typography, Paper, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Sobre = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sobre o Web App “Alerta de Choque – UTI Enfermagem”
        </Typography>
        <Typography variant="body1" paragraph>
          Esta ferramenta foi concebida como uma proposta de intervenção tecnológica para a área da saúde, com foco principal em Unidades de Terapia Intensiva (UTI) e Centros Cirúrgicos[cite: 1, 8].
        </Typography>
        <Typography variant="body1" paragraph>
         O objetivo é auxiliar na detecção precoce do risco de choque em pacientes internados, abrangendo todas as faixas etárias (neonatal, pediátrica e adulta), contribuindo para qualificar o cuidado e apoiar o raciocínio clínico de enfermeiros, médicos e outros profissionais de saúde[cite: 2, 9].
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Funcionalidades Principais
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Avaliação automatizada do risco de choque através da inserção de parâmetros clínicos." />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Classificação do risco em níveis: Baixo (10-20%), Moderado (21-50%) e Alto (51-100%)." />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Alerta por tipo provável de choque (hipovolêmico, cardiogênico, distributivo, obstrutivo)."  />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
             <ListItemText primary="Interface responsiva, projetada para ser acessível em computadores e dispositivos móveis." />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Baseado em Evidências
          </Typography>
          <Typography variant="body1" paragraph>
            [cite_start]Os critérios clínicos e fisiológicos utilizados no algoritmo são embasados em uma revisão de diretrizes nacionais e internacionais, como AMIB, SBMI, Surviving Sepsis Campaign e AHA, para garantir a confiabilidade das informações geradas[cite: 14].
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Sobre;