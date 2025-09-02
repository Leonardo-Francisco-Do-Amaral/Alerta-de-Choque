// src/components/ui/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* O Outlet renderiza o componente da rota atual */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;