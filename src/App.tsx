// src/App.tsx
import React from 'react';
import {useLocation} from 'react-router-dom';
import {ThemeContext, tokens} from './theme';
import {AuthProvider} from './common/hooks/useAuth';
import {ErrorBoundary} from './common/components/ErrorBoundary';
import AppRouter from './router';
import {InternalError} from './common/pages/InternalError';
import {BaseLayout} from './common/components/BaseLayout';

const App: React.FC = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <ThemeContext.Provider value={tokens}>
            <AuthProvider>
                {isLogin ? (
                    <ErrorBoundary fallback={<InternalError/>}>
                        <AppRouter/>
                    </ErrorBoundary>
                ) : (
                    <BaseLayout withFooter>
                        <ErrorBoundary fallback={<InternalError/>}>
                            <AppRouter/>
                        </ErrorBoundary>
                    </BaseLayout>
                )}
            </AuthProvider>
        </ThemeContext.Provider>
    );
};

export default App;
