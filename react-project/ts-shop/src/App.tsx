import { useState, useCallback } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { purple, green, grey } from '@mui/material/colors';

import Header from './components/Header';
import Switch from '@mui/material/Switch';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [themeOption, setThemeOption] = useState({
    palette: {
      type: 'light',
      primary: {
        main: purple[500], // Define the primary color
      },
      secondary: {
        main: green[500], // Define the secondary color
      },
    },
  });

  const handleChange = useCallback(() => {
    setIsDark((prevIsDark) => !prevIsDark);
    setThemeOption((prev) => ({
      ...prev,
      palette: {
        ...prev.palette,
        mode: isDark ? 'light' : 'dark',
      },
    }));
  }, [isDark]);

  const theme = createTheme(themeOption);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header>
          <Switch
            checked={!isDark}
            onChange={handleChange}
            sx={{
              '& .MuiSwitch-switchBase': {
                color: isDark ? '#DAE2ED' : '#E5EAF2', // Thumb color change
              },
              '& .MuiSwitch-track': {
                backgroundColor: isDark
                  ? '#F3F6F9 !important'
                  : '#F3F6F9 !important', // Track color change
              },
            }}
          />
        </Header>
      </ThemeProvider>
    </>
  );
}

export default App;
