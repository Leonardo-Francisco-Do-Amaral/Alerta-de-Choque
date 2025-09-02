// src/components/PatientForm.jsx
import React from 'react';
import { TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PatientForm = ({ data, setData }) => {
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        1. Informações do Paciente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Nome do Paciente"
            fullWidth
            variant="standard"
            value={data.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="ageCategory-label">Faixa Etária</InputLabel>
            <Select
              labelId="ageCategory-label"
              id="ageCategory"
              name="ageCategory"
              value={data.ageCategory}
              onChange={handleChange}
              label="Faixa Etária"
            >
              <MenuItem value="adulto">Adulto</MenuItem>
              <MenuItem value="pediatrico">Pediátrico</MenuItem>
              <MenuItem value="neonatal">Neonatal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
           <FormControl fullWidth variant="standard">
            <InputLabel id="gender-label">Gênero</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={data.gender}
              onChange={handleChange}
              label="Gênero"
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="admissionTime"
            name="admissionTime"
            label="Hora da Admissão"
            type="datetime-local"
            fullWidth
            variant="standard"
            value={data.admissionTime}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="pathology"
            name="pathology"
            label="Patologia"
            fullWidth
            variant="standard"
            value={data.pathology}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PatientForm;