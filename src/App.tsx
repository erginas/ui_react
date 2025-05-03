// src/App.tsx
import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {ThemeContext, tokens} from './theme';
import './index.css';
import {AuthProvider} from './common/hooks/useAuth';
import {AppLayout} from './common/components/ui/AppLayout';
import {ErrorBoundary} from './common/components/ErrorBoundary';
import {NotFound} from './common/pages/NotFound';
import {InternalError} from './common/pages/InternalError';

// Lazy-loaded pages
const LoginPage = lazy(() =>
    import('../src/modules/auth/pages/LoginPage').then(m => ({default: m.LoginPage}))
);
const UserDashboard = lazy(() =>
    import('../src/modules/User/pages/Dashboard').then(m => ({default: m.UserDashboard}))
);
const UserSettings = lazy(() =>
    import('../src/modules/User/pages/Settings').then(m => ({default: m.default}))
);
const ProductDashboard = lazy(() =>
    import('../src/modules/ex/Product/pages/Dashboard').then(m => ({default: m.default}))
);
const KisiDashboard = lazy(() =>
    import('../src/modules/ex/Kisiler/pages/Dashboard').then(m => ({default: m.KisiDashboard}))
);
const ProductInventory = lazy(() =>
    import('../src/modules/ex/Product/pages/Inventory').then(m => ({default: m.default}))
);

// Main App component
const App: React.FC = () => (
    <ThemeContext.Provider value={tokens}>
        <AuthProvider>
            <BrowserRouter>
                <AppLayout>
                    <ErrorBoundary fallback={<InternalError/>}>
                        <Suspense fallback={<div className="p-4">Yükleniyor…</div>}>
                            <Routes>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/" element={<Navigate to="/user/dashboard" replace/>}/>

                                <Route path="user">
                                    <Route index element={<Navigate to="dashboard" replace/>}/>
                                    <Route path="dashboard" element={<UserDashboard/>}/>
                                    <Route path="settings" element={<UserSettings/>}/>
                                </Route>

                                <Route path="product">
                                    <Route index element={<Navigate to="dashboard" replace/>}/>
                                    <Route path="dashboard" element={<ProductDashboard/>}/>
                                    <Route path="inventory" element={<ProductInventory/>}/>
                                </Route>

                                <Route path="kisi">
                                    <Route index element={<Navigate to="dashboard" replace/>}/>
                                    <Route path="dashboard" element={<KisiDashboard/>}/>
                                    {/*<Route path="profile" element={<Profile/>}/>*/}
                                </Route>

                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </Suspense>
                    </ErrorBoundary>
                </AppLayout>
            </BrowserRouter>
        </AuthProvider>
    </ThemeContext.Provider>
);

export default App;

// ReactDOM.createRoot(document.getElementById('root')!).render(<App/>);