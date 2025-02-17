import React from 'react';
import { DarkModeProvider } from './ThemeContext';
import MyApp from './MyApp';

const App = () => {
  return (
    <DarkModeProvider>
      <MyApp />
    </DarkModeProvider>
  );
};

export default App;
