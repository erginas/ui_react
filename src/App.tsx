import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {ThemeContext, tokens} from './theme';
import {AuthProvider} from './common/hooks/useAuth';
import {ErrorBoundary} from './common/components/ErrorBoundary';
import {InternalError} from './common/pages/InternalError';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {router} from './router';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeContext.Provider value={tokens}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ErrorBoundary fallback={<InternalError/>}>
                        <RouterProvider router={router}/>
                    </ErrorBoundary>
                </AuthProvider>
            </QueryClientProvider>
        </ThemeContext.Provider>
    </React.StrictMode>
);
