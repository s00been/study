import { useState, useCallback } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Layout/Header';
import Products from './pages/Products';
import Cart from './pages/Cart';

import SwitchMui from '@mui/material/Switch';

import { useDarkMode } from './ThemeContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { CssBaseline, Paper } from '@mui/material';
const MyApp = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper sx={{ boxShadow: 'none' }}>
        <Header>
          <SwitchMui checked={darkMode} onChange={toggleDarkMode} />
        </Header>

        <Router>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </Paper>
    </ThemeProvider>
  );
};

export default MyApp;
