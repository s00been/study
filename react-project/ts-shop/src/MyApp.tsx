import { useState, useCallback } from 'react';
import Header from './components/Layout/Header';
import Switch from '@mui/material/Switch';

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
      <Paper>
        <Header>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Header>
      </Paper>
    </ThemeProvider>
  );
};

export default MyApp;
