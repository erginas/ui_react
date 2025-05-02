// src/App.tsx
import React from 'react';
import { ThemeContext, tokens } from './theme';
import { AppRouter } from './router';
import '@/index.css';

const App: React.FC = () => (
  <ThemeContext.Provider value={tokens}>
    <div className="bg-background text-text min-h-screen">
      <AppRouter />
    </div>
  </ThemeContext.Provider>
);

export default App;
