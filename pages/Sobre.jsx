// src/pages/Sobre.jsx
import React from 'react';
import { Container, Typography, Paper, Box, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Sobre = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600} color="primary.main">
          Sobre o Projeto
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
          O Web App “Alerta de Choque – UTI Enfermagem” foi desenvolvido como parte do Trabalho de Conclusão de Curso (TCC) em Enfermagem do Centro Universitário das Faculdades Associadas de Ensino (UNIFAE).
        </Typography>
        <Typography variant="body1" paragraph>
          Idealizado e construído pelos enfermeiros Carlos César Barbosa, Eriky César Germano e Felipe Gabriel Chimenton, o projeto reforça o protagonismo da Enfermagem na criação de soluções tecnológicas que contribuem diretamente para a segurança do paciente crítico em Unidades de Terapia Intensiva (UTI).
        </Typography>
        <Typography variant="body1" paragraph>
          A proposta tem como objetivo apoiar enfermeiros e equipes multiprofissionais na detecção precoce do risco de choque, promovendo decisões mais rápidas, seguras e assertivas.
        </Typography>

        <Box sx={{ my: 3, p: 2, background: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
          <Typography variant="body1" paragraph>
            A ferramenta realiza uma análise automatizada do risco de choque a partir da inserção de parâmetros clínicos, gerando uma classificação em níveis:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
              <ListItemText primary="Baixo: 10–20%" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircleIcon color="warning" /></ListItemIcon>
              <ListItemText primary="Moderado: 21–50%" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircleIcon color="error" /></ListItemIcon>
              <ListItemText primary="Alto: 51–100%" />
            </ListItem>
          </List>
        </Box>

        <Typography variant="body1" paragraph>
          Além disso, o sistema sugere o tipo provável de choque (hipovolêmico, cardiogênico, distributivo ou obstrutivo), facilitando o raciocínio clínico e o direcionamento adequado do cuidado.
        </Typography>
        <Typography variant="body1" paragraph>
          Desenvolvido com base em evidências científicas e diretrizes nacionais e internacionais — incluindo AMIB, SBMI, Surviving Sepsis Campaign e AHA — o Web App oferece confiabilidade, precisão e fundamentação técnico-científica.
        </Typography>
        <Typography variant="body1" paragraph>
          Com interface responsiva e intuitiva, o “Alerta de Choque – UTI Enfermagem” demonstra como o enfermeiro pode inovar, empreender e transformar a prática assistencial por meio da tecnologia.
        </Typography>

        <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Fins Comerciais
          </Typography>
          <Typography variant="body1" paragraph>
            Apesar de ter surgido como um projeto acadêmico, o “Alerta de Choque – UTI Enfermagem” foi planejado e estruturado com fins lucrativos, permitindo sua futura comercialização e geração de receita.
          </Typography>
          <Typography variant="body1" paragraph mb={0}>
            O intuito é garantir sustentabilidade financeira, expansão contínua do sistema e retorno aos idealizadores, valorizando o empreendedorismo e o protagonismo dos profissionais de Enfermagem no desenvolvimento de tecnologias em saúde.
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Idealizadores – Enfermeiros
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><LinkedInIcon color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Carlos César Barbosa – Enfermeiro" 
                secondary={
                  <Link href="https://linkedin.com/in/carlos-cesar-barbosa-12391764" target="_blank" rel="noopener" underline="hover">
                    linkedin.com/in/carlos-cesar-barbosa-12391764
                  </Link>
                } 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><LinkedInIcon color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Eriky César Germano – Enfermeiro" 
                secondary={
                  <Link href="https://linkedin.com/in/eriky-cesar-1b747833b" target="_blank" rel="noopener" underline="hover">
                    linkedin.com/in/eriky-cesar-1b747833b
                  </Link>
                } 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><LinkedInIcon color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Felipe Gabriel Chimenton – Enfermeiro" 
                secondary={
                  <Link href="https://linkedin.com/in/felipe-gabriel-chimenton-330653224" target="_blank" rel="noopener" underline="hover">
                    linkedin.com/in/felipe-gabriel-chimenton-330653224
                  </Link>
                } 
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Apoio Técnico
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><LinkedInIcon color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Leonardo Francisco do Amaral – Engenheiro de Software" 
                secondary={
                  <Link href="https://linkedin.com/in/leonardo-francisco-do-amaral-a229191b0" target="_blank" rel="noopener" underline="hover">
                    linkedin.com/in/leonardo-francisco-do-amaral-a229191b0
                  </Link>
                } 
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'grey.300', color: 'text.secondary' }}>
          <Typography variant="h6" component="h2" gutterBottom fontSize="1.1rem">
            Créditos e Direitos
          </Typography>
          <Typography variant="body2" paragraph>
            Este site foi idealizado e desenvolvido por enfermeiros, com apoio técnico do engenheiro de software Leonardo Francisco do Amaral, como parte do projeto de TCC em Enfermagem da UNIFAE.
          </Typography>
          <Typography variant="body2" paragraph sx={{ fontWeight: 'bold' }}>
            © 2025 – UNIFAE | Todos os direitos reservados.
          </Typography>
          <Typography variant="body2" paragraph mb={0}>
            Projeto com fins lucrativos, desenvolvido para gerar valor, inovação e retorno financeiro aos profissionais idealizadores.
          </Typography>
        </Box>

      </Paper>
    </Container>
  );
};

export default Sobre;