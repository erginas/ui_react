// src/App.tsx
import React from 'react';
import { ThemeContext, tokens } from './theme';
import './index.css';
import { AuthProvider } from './common/hooks/useAuth';
import { AppLayout } from './common/components/ui/AppLayout';
import { ErrorBoundary } from './common/components/ErrorBoundary';
import {InternalError} from "./common/pages/InternalError.tsx";
import AppRouter from "./router.tsx";

const App: React.FC = () => (
  <ThemeContext.Provider value={tokens}>
    <AuthProvider>
      <AppLayout>
        <ErrorBoundary fallback={<InternalError />}>
          <AppRouter />
        </ErrorBoundary>
      </AppLayout>
    </AuthProvider>
  </ThemeContext.Provider>
);
export default App;