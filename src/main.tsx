import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {HelmetProvider} from 'react-helmet-async';
import {ThemeContext, tokens} from './theme';
import {AuthProvider} from './common/hooks/useAuth';
import {router} from './router';
import './index.css';
import {SidebarProvider} from "./context/SidebarContext.tsx";
import {HeadProvider} from "react-head";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        < HeadProvider>
            {/*<HelmetProvider>*/}
            <ThemeContext.Provider value={tokens}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <SidebarProvider> {/* ✅ WRAP EDİLDİ */}
                            <RouterProvider router={router}/>
                        </SidebarProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </ThemeContext.Provider>
            {/*</HelmetProvider>*/}
        </HeadProvider>
    </React.StrictMode>
);
