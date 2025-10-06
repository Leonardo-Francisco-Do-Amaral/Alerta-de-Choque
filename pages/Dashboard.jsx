// src/pages/Dashboard.jsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  Container, Grid, Card, Typography, Button, Box, Slider, TextField, Chip, Stack,
  Paper, Avatar, CircularProgress, useTheme, alpha, styled, LinearProgress
} from '@mui/material';
import {
  Favorite as HeartIcon, Thermostat as TempIcon, Air as RespiratoryIcon, Speed as SpeedIcon,
  Opacity as OpacityIcon, Psychology as BrainIcon, Person as PersonIcon, Male as MaleIcon,
  Female as FemaleIcon, Timeline as TimelineIcon, LocalHospital as HospitalIcon, Science as ScienceIcon,
  Warning as WarningIcon, PlayArrow as PlayIcon, Refresh as RefreshIcon, MonitorHeart as MonitorIcon,
  Bloodtype as BloodTypeIcon, ChildCare as PediatricIcon, BabyChangingStation as NeonatalIcon,
  Face as FaceIcon, AccessibilityNew as PhysicalExamIcon, Wc as GenderIcon,
  Palette as PaletteIcon, Waves as PulseIcon, HourglassEmpty as CapillaryIcon, Hearing as LungSoundIcon,
  RecordVoiceOver as HeartSoundIcon, PersonSearch as PersonSearchIcon, Healing as SpinalInjuryIcon,
  Grain as AllergenIcon, Cake as BirthdayIcon, Download as DownloadIcon, ArrowUpward as ArrowUpwardIcon,
  CheckCircle as CheckCircleIcon, Error as ErrorIcon, ReportProblem as ReportProblemIcon, Functions as FunctionsIcon
} from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- (O restante dos componentes auxiliares permanece o mesmo) ---

// --- COMPONENTES AUXILIARES ---

const IconSlider = styled(Box)(({ theme }) => ({
  '& .MuiSlider-root': {
    color: theme.palette.primary.main,
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
      background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
      },
    },
  },
}));

const VitalCard = ({ icon, title, value, unit, slider, onChange, min, max, step = 1, marks, type = 'slider' }) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleValueClick = () => {
    if (type === 'slider' && onChange) {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    let finalValue = parseFloat(inputValue);
    if (isNaN(finalValue)) {
      finalValue = min;
    } else if (finalValue > max) {
      finalValue = max;
    } else if (finalValue < min) {
      finalValue = min;
    }
    onChange(finalValue);
    setIsEditing(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: alpha(theme.palette.background.paper, 0.8),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        height: '100%'
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.dark, width: 40, height: 40 }}>
            {icon}
          </Avatar>
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
        </Stack>
        <Box sx={{ textAlign: 'center', py: 1 }}>
          {isEditing ? (
            <TextField
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              type="number"
              autoFocus
              size="small"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': {
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.8rem',
                },
                maxWidth: '120px'
              }}
            />
          ) : (
            <Typography
              variant="h4"
              fontWeight={700}
              color="primary"
              onClick={handleValueClick}
              sx={{ cursor: type === 'slider' ? 'pointer' : 'default' }}
            >
              {value} <span style={{ fontSize: '1rem', fontWeight: 400, color: theme.palette.text.secondary }}>{unit}</span>
            </Typography>
          )}
        </Box>
        {slider && (
          <IconSlider>
            <Slider
              value={typeof value === 'number' ? value : 0}
              onChange={(e, newValue) => onChange(newValue)}
              aria-labelledby="input-slider"
              min={min}
              max={max}
              step={step}
              marks={marks}
            />
          </IconSlider>
        )}
      </Stack>
    </Card>
  );
};

const IconSelector = ({ title, icon, options, value, onChange }) => {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: alpha(theme.palette.background.paper, 0.8),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        height: '100%'
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.dark, width: 40, height: 40 }}>
            {icon}
          </Avatar>
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {options.map((option) => (
            <Chip
              key={option.value}
              icon={option.icon}
              label={option.label}
              onClick={() => onChange(option.value)}
              variant={value === option.value ? 'filled' : 'outlined'}
              color={value === option.value ? 'primary' : 'default'}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};


const ShockTypeResult = ({ result, isLoading }) => {
  const theme = useTheme();

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'alto': return theme.palette.error.main;
      case 'moderado': return theme.palette.warning.main;
      default: return theme.palette.success.main;
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
          Analisando parâmetros...
        </Typography>
      </Box>
    );
  }

  if (!result || !result.probabilities.length) {
    return (
      <Box textAlign="center" py={6}>
        <ScienceIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Configure os parâmetros e inicie a análise
        </Typography>
      </Box>
    );
  }

  const allDiagnoses = result.probabilities;
  const riskColor = getRiskColor(result.level);

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha(riskColor, 0.1)} 0%, ${alpha(riskColor, 0.05)} 100%)`,
          border: `2px solid ${alpha(riskColor, 0.3)}`,
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Análise Diferencial de Choque
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {allDiagnoses.map((diag, index) => (
            <Box key={index}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" fontWeight={index === 0 ? 700 : 400} color={index === 0 ? riskColor : 'text.primary'}>
                  {diag.type}
                </Typography>
                <Typography variant="body1" fontWeight={600}>{`${Math.round(diag.percentage)}%`}</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={diag.percentage}
                sx={{
                  height: index === 0 ? 10 : 6,
                  borderRadius: 5,
                  backgroundColor: alpha(riskColor, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: index === 0 ? riskColor : theme.palette.secondary.main
                  }
                }}
              />
            </Box>
          ))}
        </Stack>
      </Paper>

      {result.alerts && result.alerts.length > 0 && (
        <Card elevation={0} sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.warning.main, 0.05) }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Alertas Clínicos Identificados
          </Typography>
          <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
            {result.alerts.map((alert, index) => (
              <Chip key={index} icon={<WarningIcon />} label={alert} color="warning" variant="outlined" size="small" />
            ))}
          </Stack>
        </Card>
      )}
    </Stack>
  );
};

// --- COMPONENTE PRINCIPAL DO DASHBOARD ---
const Dashboard = () => {
  const theme = useTheme();

  // --- ESTADO DE IDENTIFICAÇÃO ---
  const [identification, setIdentification] = useState({
    professional: '', professionalName: '', sector: '',
    bed: '', drugAllergy: '', examModification: false, notes: '',
  });
  const professionalOptions = [
    { value: 'Médico', label: 'Médico' }, { value: 'Enfermeiro', label: 'Enfermeiro' },
    { value: 'Fisioterapeuta', label: 'Fisioterapeuta' }, { value: 'Outros', label: 'Outros' },
  ];

  // --- ESTADOS ---
  const [patientData, setPatientData] = useState({
    name: '', birthDate: '', age: '', ageInDays: 0,
    gender: 'masculino', weight: 70, category: 'Adulto', pathology: '',
  });

  const [vitals, setVitals] = useState({
    systolic: 120, diastolic: 80, fc: 80, fr: 16, spo2: 98, temperature: 36.5, lactate: 1.5,
    pvc: 8, urineVolume: 210, collectionHours: 6,
  });

  const [physicalExam, setPhysicalExam] = useState({
    capillaryRefill: 'normal', skinColor: 'normal', consciousness: 'alerta',
    jugularVeinDistension: false, lungSounds: 'normal', chestExpansion: 'symmetric',
    heartSounds: 'normal', skinTemperature: 'normal', urticaria: false, spinalInjury: false,
    beckTriad: false, trachealDeviation: false,
  });

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // ✅ **PASSO 1: AJUSTE O ESTADO** - Remova a cor daqui
  const [urinaryDebit, setUrinaryDebit] = useState({ value: 0, status: 'Normal' });

  // Efeito para calcular a idade
  useEffect(() => {
    if (patientData.birthDate) {
      const birthDate = new Date(patientData.birthDate);
      const today = new Date();
      const ageInMilliseconds = today.getTime() - birthDate.getTime();
      const ageInDays = Math.max(0, Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24)));
      const years = Math.floor(ageInDays / 365.25);
      let ageString = `${ageInDays} dia${ageInDays !== 1 ? 's' : ''}`;
      if (years > 0) {
        ageString = `${years} ano${years > 1 ? 's' : ''}`;
      }
      let category = 'Adulto';
      if (ageInDays < 28) category = 'Neo Natal';
      else if (years < 18) category = 'Pediátrico';
      setPatientData(p => ({ ...p, age: ageString, ageInDays, category }));
    }
  }, [patientData.birthDate]);

  // ✅ **PASSO 2: AJUSTE O USEEFFECT** - Calcule apenas o valor e o status
  useEffect(() => {
    const { weight } = patientData;
    const { urineVolume, collectionHours } = vitals;

    if (weight > 0 && urineVolume >= 0 && collectionHours > 0) {
      const debit = urineVolume / (weight * collectionHours);
      let status = 'Normal';

      if (debit < 0.3) {
        status = 'Grave';
      } else if (debit < 0.5) {
        status = 'Alerta';
      }
      setUrinaryDebit({ value: debit, status });
    } else {
      setUrinaryDebit({ value: 0, status: 'Aguardando dados' });
    }
  }, [patientData.weight, vitals.urineVolume, vitals.collectionHours]);


  // --- OPÇÕES PARA SELETORES ---
  const genderOptions = [{ value: 'masculino', label: 'Masculino', icon: <MaleIcon /> }, { value: 'feminino', label: 'Feminino', icon: <FemaleIcon /> }];
  const capillaryRefillOptions = [{ value: 'normal', label: 'Normal < 2s' }, { value: 'lento', label: 'Lento > 2s' }];
  const skinColorOptions = [{ value: 'normal', label: 'Normal' }, { value: 'palidez', label: 'Palidez' }, { value: 'cianose', label: 'Cianose' }, { value: 'moteado', label: 'Moteado' }];
  const consciousnessOptions = [{ value: 'alerta', label: 'Alerta' }, { value: 'sonolento', label: 'Sonolento' }, { value: 'confuso', label: 'Confuso' }, { value: 'comatoso', label: 'Comatoso' }];
  const yesNoOptions = [{ value: true, label: 'Sim' }, { value: false, label: 'Não' }];
  const lungSoundOptions = [{ value: 'normal', label: 'Normais' }, { value: 'estertores', label: 'Estertores' }, { value: 'sibilos', label: 'Sibilos' }, { value: 'ausente', label: 'Murmúrio Ausente' }];
  const heartSoundOptions = [{ value: 'normal', label: 'Normofonéticas' }, { value: 'abafadas', label: 'Hipofonéticas' }];
  const skinTempOptions = [{ value: 'normal', label: 'Normal' }, { value: 'quente', label: 'Quente' }, { value: 'fria', label: 'Fria/Pegajosa' }];
  const chestExpansionOptions = [{ value: 'symmetric', label: 'Simétrica' }, { value: 'asymmetric', label: 'Assimétrica' }];


  // --- LÓGICA DE ANÁLISE DE CHOQUE ---
  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    let alerts = [];
    let scores = {
      hypovolemic: 0, septic: 0, cardiogenic: 0,
      anaphylactic: 0, neurogenic: 0, obstructive: 0,
    };

    const isHypotensive = vitals.systolic < 90;
    const isTachycardic = vitals.fc > 100;
    const isTachypneic = vitals.fr > 20;

    if (isHypotensive) {
      alerts.push('Hipotensão Arterial');
      Object.keys(scores).forEach(k => scores[k] += 20);
    } else {
      alerts.push('Paciente Normotenso');
      Object.keys(scores).forEach(k => scores[k] += 1);
    }

    if (isTachycardic) {
      alerts.push('Taquicardia');
      scores.hypovolemic += 15; scores.septic += 10; scores.cardiogenic += 5;
      scores.anaphylactic += 10; scores.neurogenic -= 10; scores.obstructive += 15;
    }
    if (isTachypneic) {
      alerts.push('Taquipneia');
      scores.septic += 10; scores.cardiogenic += 10; scores.obstructive += 15;
    }
    // Lógica de Débito Urinário
    if (urinaryDebit.status === 'Grave') {
      alerts.push('Débito Urinário Grave (< 0,3 mL/kg/h)');
      scores.hypovolemic += 25; scores.septic += 20; scores.cardiogenic += 20; scores.obstructive += 15;
    } else if (urinaryDebit.status === 'Alerta') {
      alerts.push('Oligúria (< 0,5 mL/kg/h)');
      scores.hypovolemic += 15; scores.septic += 10; scores.cardiogenic += 10; scores.obstructive += 10;
    }


    const poorPerfusion = physicalExam.capillaryRefill === 'lento' || ['palidez', 'cianose'].includes(physicalExam.skinColor) || physicalExam.skinTemperature === 'fria';
    if (poorPerfusion) {
      alerts.push('Má Perfusão Periférica');
      scores.hypovolemic += 20; scores.cardiogenic += 15; scores.septic += 10; scores.obstructive += 10;
    }

    if (vitals.lactate > 2) {
      alerts.push(`Lactato Elevado (${vitals.lactate} mmol/L)`);
      const lactatePoints = vitals.lactate >= 4 ? 25 : 15;
      scores.septic += lactatePoints; scores.hypovolemic += lactatePoints - 10;
      scores.cardiogenic += lactatePoints - 10; scores.obstructive += lactatePoints - 5;
    }

    if (physicalExam.jugularVeinDistension) {
      alerts.push('Turgência Jugular');
      scores.cardiogenic += 30; scores.obstructive += 25;
    }
    if (physicalExam.lungSounds === 'estertores') {
      alerts.push('Estertores Pulmonares (Edema)');
      scores.cardiogenic += 30;
    }

    const hasFeverOrHypothermia = vitals.temperature > 38 || vitals.temperature < 36;
    if (hasFeverOrHypothermia) {
      alerts.push(vitals.temperature > 38 ? 'Febre' : 'Hipotermia');
      scores.septic += 25;
    }
    if (physicalExam.skinTemperature === 'quente' && !isTachycardic) {
      alerts.push('Pele Quente (Vasodilatação)');
      scores.septic += 20;
    }

    if (physicalExam.urticaria) {
      alerts.push('Urticária / Angioedema');
      scores.anaphylactic += 50;
    }
    if (physicalExam.lungSounds === 'sibilos') {
      alerts.push('Sibilância (Broncoespasmo)');
      scores.anaphylactic += 40;
    }

    const isBradycardic = vitals.fc < 60;
    if (isHypotensive && isBradycardic) {
      alerts.push('Hipotensão com Bradicardia');
      scores.neurogenic += 50;
      if (physicalExam.spinalInjury) {
        alerts.push('Suspeita de Trauma Raquimedular');
        scores.neurogenic += 30;
      }
    }
    if (physicalExam.skinTemperature === 'quente' && isBradycardic) {
      scores.neurogenic += 20;
    }

    if (vitals.pvc > 12) {
      alerts.push(`PVC Elevada (${vitals.pvc} mmHg)`);
      scores.obstructive += 30; scores.cardiogenic += 15;
    }
    if (vitals.spo2 < 90) {
      alerts.push(`Hipoxemia (SatO₂ ${vitals.spo2}%)`);
      scores.obstructive += 20;
    }
    if (physicalExam.beckTriad) {
      alerts.push('Tríade de Beck (Sugestivo de Tamponamento)');
      scores.obstructive += 50;
    }
    if (physicalExam.trachealDeviation || physicalExam.lungSounds === 'ausente') {
      alerts.push('Sugestivo de Pneumotórax Hipertensivo');
      scores.obstructive += 45;
    }
    if (physicalExam.heartSounds === 'abafadas') {
      scores.obstructive += 15; scores.cardiogenic += 5;
    }

    Object.keys(scores).forEach(k => { scores[k] = Math.max(0, scores[k]) });

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    const shockTypesMap = {
      hypovolemic: 'Choque Hipovolêmico', septic: 'Choque Séptico',
      cardiogenic: 'Choque Cardiogênico', anaphylactic: 'Choque Anafilático',
      neurogenic: 'Choque Neurogênico', obstructive: 'Choque Obstrutivo',
    };

    let probabilities = Object.entries(scores).map(([key, value]) => ({
      type: shockTypesMap[key],
      percentage: totalScore > 0 ? (value / totalScore) * 100 : 0,
    }));

    probabilities.sort((a, b) => b.percentage - a.percentage);

    let level = 'Baixo';
    const maxPercentage = probabilities[0]?.percentage ?? 0;
    if (isHypotensive) {
      if (maxPercentage > 60) level = 'Alto';
      else if (maxPercentage > 30) level = 'Moderado';
    }

    setResult({
      probabilities,
      level,
      alerts: [...new Set(alerts)],
    });

    setIsLoading(false);
  }, [vitals, physicalExam, urinaryDebit]);

  const handleReset = () => {
    setResult(null);
    setIsLoading(false);
  };

  // --- FUNÇÃO PARA GERAR PDF PROFISSIONAL (sem alterações, omitido para brevidade) ---
  const handleDownloadPdf = () => {
    const doc = new jsPDF('portrait', 'pt', 'a4');
    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = margin;

    const addText = (text, options, newY) => {
      doc.text(text, options.x, y, options);
      y = newY !== undefined ? newY : y + (options.lineHeight || 12);
    };

    // --- CABEÇALHO ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    addText('Relatório de Análise de Risco de Choque', { x: pageWidth / 2, align: 'center' }, y + 30);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const generationDate = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR');
    addText(`Gerado em: ${generationDate}`, { x: pageWidth / 2, align: 'center' }, y + 20);

    // --- SEÇÃO 1: DADOS DO ATENDIMENTO (ORDEM ALTERADA) ---
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    addText('1. Identificação do Atendimento', { x: margin }, y + 20);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    autoTable(doc, {
      startY: y,
      body: [
        ['Profissional:', identification.professional || 'Não informado'],
        ['Nome do Profissional:', identification.professionalName || 'Não informado'],
        ['Setor:', identification.sector || 'Não informado'],
        ['Leito nº:', identification.bed || 'Não informado'],
        ['Alergia Medicamentosa:', identification.drugAllergy || 'Nenhuma informada'],
        ['Modificação no Exame Físico:', identification.examModification ? 'Sim' : 'Não'],
      ],
      theme: 'plain',
      styles: { fontSize: 11 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 150 }, 1: {} }
    });
    y = doc.lastAutoTable.finalY + 15;

    // --- SEÇÃO 2: DADOS DO PACIENTE (ORDEM ALTERADA) ---
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    addText('2. Dados do Paciente', { x: margin }, y + 20);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    autoTable(doc, {
      startY: y,
      body: [
        ['Nome:', patientData.name || 'Não informado'],
        ['Data de Nasc.:', patientData.birthDate ? new Date(patientData.birthDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'Não informada'],
        ['Idade:', patientData.age || 'Não informada'],
        ['Peso:', `${patientData.weight} kg`],
        ['Sexo:', patientData.gender],
        ['Hipótese Diagnóstica:', patientData.pathology || 'Não informada']
      ],
      theme: 'plain',
      styles: { fontSize: 11 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 150 }, 1: {} }
    });
    y = doc.lastAutoTable.finalY + 10;

    // --- SEÇÃO 3: AVALIAÇÃO CLÍNICA ---
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    addText('3. Avaliação Clínica', { x: margin }, y + 20);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    const vitalsData = Object.entries({
      "Pressão Sistólica": `${vitals.systolic} mmHg`, "Pressão Diastólica": `${vitals.diastolic} mmHg`,
      "Frequência Cardíaca": `${vitals.fc} bpm`, "Frequência Respiratória": `${vitals.fr} irpm`,
      "Temperatura": `${vitals.temperature} °C`, "Saturação O₂": `${vitals.spo2} %`,
      "Lactato": `${vitals.lactate} mmol/L`, "PVC": `${vitals.pvc} mmHg`,
      "Débito Urinário": `${urinaryDebit.value.toFixed(2)} mL/kg/h (${urinaryDebit.status})`,
    }).map(([key, value]) => [key, value]);

    const examData = Object.entries({
      "Nível de Consciência": physicalExam.consciousness, "Enchimento Capilar": physicalExam.capillaryRefill,
      "Coloração da Pele": physicalExam.skinColor, "Temperatura da Pele": physicalExam.skinTemperature,
      "Sons Pulmonares": physicalExam.lungSounds, "Sons Cardíacos": physicalExam.heartSounds,
      "Expansão Torácica": physicalExam.chestExpansion, "Turgência Jugular": physicalExam.jugularVeinDistension ? 'Sim' : 'Não',
      "Urticária/Angioedema": physicalExam.urticaria ? 'Sim' : 'Não', "Trauma Raquimedular": physicalExam.spinalInjury ? 'Sim' : 'Não',
      "Tríade de Beck": physicalExam.beckTriad ? 'Sim' : 'Não', "Desvio de Traqueia": physicalExam.trachealDeviation ? 'Sim' : 'Não'
    }).map(([key, value]) => [key, value]);

    const combinedData = [];
    const maxLength = Math.max(vitalsData.length, examData.length);
    for (let i = 0; i < maxLength; i++) {
      combinedData.push([...(vitalsData[i] || ['', '']), ...(examData[i] || ['', ''])]);
    }

    autoTable(doc, {
      startY: y, head: [['Parâmetros Vitais', 'Valor', 'Exame Físico', 'Achado']], body: combinedData,
      theme: 'grid', headStyles: { fillColor: [22, 160, 133], textColor: 255 }, styles: { fontSize: 10 }
    });
    y = doc.lastAutoTable.finalY + 30;

    // --- SEÇÃO 4: ANÁLISE DE RISCO ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    addText('4. Análise de Risco de Choque', { x: margin }, y + 20);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;

    if (result) {
      doc.setFontSize(12);
      addText(`Nível de Risco: ${result.level}`, { x: margin, fontStyle: 'bold' }, y + 20);

      autoTable(doc, {
        startY: y, head: [['Tipo de Choque', 'Probabilidade (%)']],
        body: result.probabilities.map(p => [p.type, p.percentage.toFixed(1)]),
        theme: 'striped', headStyles: { fillColor: [44, 62, 80], textColor: 255 }, styles: { fontSize: 11 },
        didParseCell: function (data) {
          if (data.column.index === 1 && data.row.index === 0) {
            data.cell.styles.fontStyle = 'bold'; data.cell.styles.textColor = [44, 62, 80];
          }
        }
      });
      y = doc.lastAutoTable.finalY + 20;

      doc.setFont('helvetica', 'bold');
      addText('Alertas Clínicos Identificados:', { x: margin }, y + 15);
      doc.setFont('helvetica', 'normal');
      addText(result.alerts.join('; '), { x: margin, maxWidth: pageWidth - 2 * margin }, y + 15);
    } else {
      addText('A análise de risco não foi executada.', { x: margin }, y + 15);
    }
    y = doc.lastAutoTable.finalY > y ? doc.lastAutoTable.finalY : y;

    // --- SEÇÃO 5: ANOTAÇÕES DO FORMULÁRIO ---
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    addText('5. Anotações Iniciais Registradas', { x: margin }, y + 20);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
    const notesText = identification.notes || 'Nenhuma anotação registrada.';
    const splitNotes = doc.splitTextToSize(notesText, pageWidth - (margin * 2));
    addText(splitNotes, { x: margin }, y + (splitNotes.length * 12) + 5);

    // --- SEÇÃO 6: OBSERVAÇÕES MANUSCRITAS (TÍTULO ALTERADO) ---
    y += 30;
    if (y > doc.internal.pageSize.getHeight() - 200) { doc.addPage(); y = margin; }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    addText('6. Observações', { x: margin }, y + 20);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;

    const lineHeight = 20;
    for (let i = 0; i < 15; i++) {
      y += lineHeight;
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
    }

    // --- RODAPÉ ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.text(
        'Este é um relatório gerado por sistema de apoio à decisão. A interpretação final é de responsabilidade do profissional de saúde.',
        margin, doc.internal.pageSize.getHeight() - 20
      );
      doc.text(
        `Página ${i} de ${pageCount}`,
        pageWidth - margin, doc.internal.pageSize.getHeight() - 20, { align: 'right' }
      );
    }

    doc.save(`relatorio_${patientData.name.replace(/ /g, '_') || 'paciente'}.pdf`);
  };

  // ✅ **PASSO 3: DEFINA A COR NA RENDERIZAÇÃO**
  let debitStatusColor = theme.palette.text.secondary;
  if (urinaryDebit.status === 'Normal') {
    debitStatusColor = theme.palette.success.main;
  } else if (urinaryDebit.status === 'Alerta') {
    debitStatusColor = theme.palette.warning.main;
  } else if (urinaryDebit.status === 'Grave') {
    debitStatusColor = theme.palette.error.main;
  }


  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`, py: 4, }}>
      <Container maxWidth="xl">
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, color: 'white' }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar sx={{ width: 64, height: 64, backgroundColor: 'rgba(255,255,255,0.2)' }}><HospitalIcon sx={{ fontSize: 32 }} /></Avatar>
            <Box>
              <Typography variant="h3" fontWeight={700} gutterBottom>Análise Diferencial de Choque</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Sistema de apoio à decisão clínica</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Card de Identificação Profissional */}
        <Card elevation={2} sx={{ p: 4, mb: 4, borderRadius: 4, background: alpha(theme.palette.background.paper, 0.95), boxShadow: `0 4px 24px ${alpha(theme.palette.primary.main, 0.08)}` }}>
          <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonIcon color="primary" /> Identificação do Atendimento
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Profissional (Cargo)"
                value={identification.professional}
                onChange={e => setIdentification({ ...identification, professional: e.target.value })}
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option value="">Selecione</option>
                {professionalOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Nome do Profissional" value={identification.professionalName} onChange={e => setIdentification({ ...identification, professionalName: e.target.value })} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Setor" value={identification.sector} onChange={e => setIdentification({ ...identification, sector: e.target.value })} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Leito nº" value={identification.bed} onChange={e => setIdentification({ ...identification, bed: e.target.value })} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Alergia Medicamentosa" value={identification.drugAllergy} onChange={e => setIdentification({ ...identification, drugAllergy: e.target.value })} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ height: '100%' }}>
                <Typography>Modificação no Exame Físico:</Typography>
                <Button
                  variant={identification.examModification ? 'contained' : 'outlined'}
                  color={identification.examModification ? 'primary' : 'inherit'}
                  onClick={() => setIdentification({ ...identification, examModification: !identification.examModification })}
                  sx={{ minWidth: 80 }}
                >
                  {identification.examModification ? 'Sim' : 'Não'}
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Anotações"
                value={identification.notes}
                onChange={e => setIdentification({ ...identification, notes: e.target.value })}
                multiline
                rows={4}
                variant="outlined"
                sx={{ background: alpha(theme.palette.primary.light, 0.04), borderRadius: 2 }}
                placeholder="Observações, condutas iniciais, evolução clínica."
              />
            </Grid>
          </Grid>
        </Card>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Stack spacing={4}>
              <Card elevation={0} sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><PersonIcon color="primary" /> Dados do Paciente</Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Nome do Paciente" value={patientData.name} onChange={(e) => setPatientData({ ...patientData, name: e.target.value })} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Data de Nascimento"
                      type="date"
                      value={patientData.birthDate}
                      onChange={(e) => setPatientData({ ...patientData, birthDate: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <VitalCard icon={<BirthdayIcon />} title="Idade" value={patientData.age || 'N/A'} unit="" type="display" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <VitalCard icon={<SpeedIcon />} title="Peso" value={patientData.weight} unit="kg" slider onChange={(value) => setPatientData({ ...patientData, weight: value })} min={1} max={200} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <IconSelector title="Sexo" icon={<GenderIcon />} options={genderOptions} value={patientData.gender} onChange={(value) => setPatientData({ ...patientData, gender: value })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Categoria" value={patientData.category} variant="outlined" InputProps={{ startAdornment: patientData.category === 'Adulto' ? <FaceIcon sx={{ mr: 1 }} /> : patientData.category === 'Pediátrico' ? <PediatricIcon sx={{ mr: 1 }} /> : <NeonatalIcon sx={{ mr: 1 }} /> }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Patologia / Hipótese Diagnóstica" value={patientData.pathology} onChange={(e) => setPatientData({ ...patientData, pathology: e.target.value })} helperText="Ex: 'Infecção urinária', 'Trauma torácico'" />
                  </Grid>
                </Grid>
              </Card>

              {/* Card de Débito Urinário */}
              <Card elevation={0} sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FunctionsIcon color="primary" /> Análise de Débito Urinário
                </Typography>
                <Grid container spacing={3} alignItems="center" sx={{ mt: 1 }}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Volume Coletado (mL)"
                      type="number"
                      value={vitals.urineVolume}
                      onChange={(e) => setVitals({ ...vitals, urineVolume: Number(e.target.value) })}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Horas de Coleta"
                      type="number"
                      value={vitals.collectionHours}
                      onChange={(e) => setVitals({ ...vitals, collectionHours: Number(e.target.value) })}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                  {/* ✅ **PASSO 4: USE A VARIÁVEL DE COR CORRIGIDA** */}
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, background: alpha(debitStatusColor, 0.1), textAlign: 'center', border: `2px solid ${debitStatusColor}` }}>
                      <Typography variant="subtitle1" fontWeight={600}>Resultado</Typography>
                      <Typography variant="h5" fontWeight={700} color={debitStatusColor}>
                        {urinaryDebit.value.toFixed(2)} <span style={{ fontSize: '1rem' }}>mL/kg/h</span>
                      </Typography>
                      <Chip
                        icon={
                          urinaryDebit.status === 'Normal' ? <CheckCircleIcon /> :
                          urinaryDebit.status === 'Alerta' ? <ReportProblemIcon /> :
                          <ErrorIcon />
                        }
                        label={urinaryDebit.status}
                        sx={{ mt: 1, backgroundColor: debitStatusColor, color: 'white', fontWeight: 600 }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Card>


              <Card elevation={0} sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><MonitorIcon color="primary" /> Parâmetros Vitais</Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}><VitalCard icon={<BloodTypeIcon />} title="Pressão Sistólica" value={vitals.systolic} unit="mmHg" slider onChange={(v) => setVitals({ ...vitals, systolic: v })} min={40} max={220} marks={[{ value: 90, label: '90' }]} /></Grid>
                  <Grid item xs={12} sm={6}><VitalCard icon={<BloodTypeIcon />} title="Pressão Diastólica" value={vitals.diastolic} unit="mmHg" slider onChange={(v) => setVitals({ ...vitals, diastolic: v })} min={20} max={140} /></Grid>
                  <Grid item xs={12} sm={6}><VitalCard icon={<HeartIcon />} title="Frequência Cardíaca" value={vitals.fc} unit="bpm" slider onChange={(v) => setVitals({ ...vitals, fc: v })} min={30} max={220} marks={[{ value: 60, label: '60' }, { value: 100, label: '100' }]} /></Grid>
                  <Grid item xs={12} sm={6}><VitalCard icon={<RespiratoryIcon />} title="Frequência Respiratória" value={vitals.fr} unit="irpm" slider onChange={(v) => setVitals({ ...vitals, fr: v })} min={5} max={60} marks={[{ value: 20, label: '20' }]} /></Grid>
                  <Grid item xs={12} sm={6}><VitalCard icon={<TempIcon />} title="Temperatura" value={vitals.temperature} unit="°C" slider onChange={(v) => setVitals({ ...vitals, temperature: v })} min={32} max={42} step={0.1} marks={[{ value: 36, label: '36' }, { value: 38, label: '38' }]} /></Grid>
                  <Grid item xs={12} sm={6}><VitalCard icon={<OpacityIcon />} title="Saturação O2" value={vitals.spo2} unit="%" slider onChange={(v) => setVitals({ ...vitals, spo2: v })} min={70} max={100} marks={[{ value: 94, label: '94' }]} /></Grid>
                  <Grid item xs={12} sm={6}><VitalCard icon={<BloodTypeIcon />} title="Lactato" value={vitals.lactate} unit="mmol/L" slider onChange={(v) => setVitals({ ...vitals, lactate: v })} min={0.5} max={15} step={0.1} marks={[{ value: 2, label: '2' }, { value: 4, label: '4' }]} /></Grid>
                  <Grid item xs={12} sm={6}><VitalCard icon={<ArrowUpwardIcon />} title="Pressão Venosa Central" value={vitals.pvc} unit="mmHg" slider onChange={(v) => setVitals({ ...vitals, pvc: v })} min={0} max={30} marks={[{ value: 12, label: '12' }]} /></Grid>
                </Grid>
              </Card>

              <Card elevation={0} sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><PhysicalExamIcon color="primary" /> Exame Físico Detalhado</Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Nível de Consciência" icon={<BrainIcon />} options={consciousnessOptions} value={physicalExam.consciousness} onChange={(v) => setPhysicalExam({ ...physicalExam, consciousness: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Enchimento Capilar" icon={<CapillaryIcon />} options={capillaryRefillOptions} value={physicalExam.capillaryRefill} onChange={(v) => setPhysicalExam({ ...physicalExam, capillaryRefill: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Coloração da Pele" icon={<PaletteIcon />} options={skinColorOptions} value={physicalExam.skinColor} onChange={(v) => setPhysicalExam({ ...physicalExam, skinColor: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Temperatura da Pele" icon={<TempIcon />} options={skinTempOptions} value={physicalExam.skinTemperature} onChange={(v) => setPhysicalExam({ ...physicalExam, skinTemperature: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Sons Pulmonares" icon={<LungSoundIcon />} options={lungSoundOptions} value={physicalExam.lungSounds} onChange={(v) => setPhysicalExam({ ...physicalExam, lungSounds: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Sons Cardíacos" icon={<HeartSoundIcon />} options={heartSoundOptions} value={physicalExam.heartSounds} onChange={(v) => setPhysicalExam({ ...physicalExam, heartSounds: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Expansão Torácica" icon={<RespiratoryIcon />} options={chestExpansionOptions} value={physicalExam.chestExpansion} onChange={(v) => setPhysicalExam({ ...physicalExam, chestExpansion: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Turgência Jugular" icon={<PersonSearchIcon />} options={yesNoOptions} value={physicalExam.jugularVeinDistension} onChange={(v) => setPhysicalExam({ ...physicalExam, jugularVeinDistension: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Urticária / Angioedema" icon={<AllergenIcon />} options={yesNoOptions} value={physicalExam.urticaria} onChange={(v) => setPhysicalExam({ ...physicalExam, urticaria: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Suspeita de Trauma Raquimedular" icon={<SpinalInjuryIcon />} options={yesNoOptions} value={physicalExam.spinalInjury} onChange={(v) => setPhysicalExam({ ...physicalExam, spinalInjury: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Tríade de Beck" icon={<WarningIcon />} options={yesNoOptions} value={physicalExam.beckTriad} onChange={(v) => setPhysicalExam({ ...physicalExam, beckTriad: v })} /></Grid>
                  <Grid item xs={12} sm={6} md={4}><IconSelector title="Desvio de Traqueia" icon={<WarningIcon />} options={yesNoOptions} value={physicalExam.trachealDeviation} onChange={(v) => setPhysicalExam({ ...physicalExam, trachealDeviation: v })} /></Grid>
                </Grid>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card elevation={0} sx={{ p: 4, borderRadius: 4, minHeight: 600, display: 'flex', flexDirection: 'column', position: 'sticky', top: 20 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><TimelineIcon color="primary" /> Análise de Risco</Typography>
              <Box flexGrow={1} sx={{ mt: 2 }}><ShockTypeResult result={result} isLoading={isLoading} /></Box>
              <Stack spacing={2} sx={{ mt: 3 }}>
                {result ? (
                  <Stack spacing={2}>
                    <Button variant="contained" size="large" fullWidth onClick={handleDownloadPdf} startIcon={<DownloadIcon />} sx={{ py: 2, borderRadius: 3, fontWeight: 600, textTransform: 'none' }}>Baixar Relatório (PDF)</Button>
                    <Button variant="outlined" size="large" fullWidth onClick={handleReset} startIcon={<RefreshIcon />} sx={{ py: 2, borderRadius: 3, fontWeight: 600, textTransform: 'none' }}>Nova Análise</Button>
                  </Stack>
                ) : (
                  <Button variant="contained" size="large" fullWidth onClick={handleAnalyze} disabled={isLoading || !patientData.name || !patientData.birthDate} startIcon={<PlayIcon />} sx={{ py: 2.5, borderRadius: 3, fontWeight: 600, textTransform: 'none', fontSize: '1.1rem', background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`, '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}` } }}>
                    {isLoading ? 'Analisando...' : 'Iniciar Análise'}
                  </Button>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;