// src/components/ClinicalDataForm.jsx
import React from 'react';
import { TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Componente para criar campos de input com menos repetição
const FormInput = ({ label, name, value, onChange, ...props }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      {...props}
    />
  </Grid>
);

const ClinicalDataForm = ({ data, setData }) => {
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>Dados Clínicos e Exame Físico [cite: 4]</Typography>
      <Grid container spacing={2}>
        {/* Sinais Vitais com alertas visuais podem ser implementados aqui [cite: 4] */}
        <FormInput label="Pressão Arterial Média (PAM)" name="pam" value={data.pam} onChange={handleChange} type="number" />
        <FormInput label="Frequência Cardíaca (bpm)" name="fc" value={data.fc} onChange={handleChange} type="number" />
        <FormInput label="SpO₂ (%)" name="spo2" value={data.spo2} onChange={handleChange} type="number" />
        <FormInput label="Lactato (mmol/L)" name="lactate" value={data.lactate} onChange={handleChange} type="number" />
        <FormInput label="Diurese Horária (mL/kg/h)" name="diuresis" value={data.diuresis} onChange={handleChange} type="number" />
        <FormInput label="Enchimento Capilar (seg)" name="capRefill" value={data.capRefill} onChange={handleChange} type="number" />

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Estado de Consciência</InputLabel>
            <Select name="consciousness" value={data.consciousness} label="Estado de Consciência" onChange={handleChange}>
              <MenuItem value="alerta">Alerta</MenuItem>
              <MenuItem value="confuso">Confuso</MenuItem>
              <MenuItem value="sonolento">Sonolento</MenuItem>
              <MenuItem value="nao_responsivo">Não Responsivo</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Outros campos de exame físico podem ser adicionados aqui [cite: 16] */}
      </Grid>
    </>
  );
};

export default ClinicalDataForm;