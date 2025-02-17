import { createTheme } from '@mui/material/styles';
import { purple, green } from '@mui/material/colors'; // Import colors

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500], // Define the primary color
    },
    secondary: {
      main: green[500], // Define the secondary color
    },
  },
});

export default theme;
