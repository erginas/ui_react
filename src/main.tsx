// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter} from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 dakikada bir tazele
            // cacheTime: 1000 * 60 * 30, // 30 dakika cache
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
            </ BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);