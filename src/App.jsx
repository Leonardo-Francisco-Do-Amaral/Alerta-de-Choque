// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "/pages/Dashboard.jsx";
import Sobre from "/pages/Sobre.jsx";
import Layout from "/components/ui/Layout.jsx";

function App() {
  return (
    <Routes>
      {/* Todas as rotas dentro do Layout terão o Header */}
      <Route path="/" element={<Layout />}>
        {/* A rota principal (index) renderizará o Dashboard */}
        <Route index element={<Dashboard />} /> 
        {/* A rota /sobre renderizará a página Sobre */}
        <Route path="sobre" element={<Sobre />} />
      </Route>
    </Routes>
  );
}

export default App;