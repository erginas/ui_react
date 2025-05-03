// src/modules/Auth/router.tsx
import React, {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

// const LoginPage = lazy(() => import('./pages/LoginPage'));

const LoginPage = lazy(() =>
    import('./pages/LoginPage').then(m => ({default: m.LoginPage}))
);

const AuthRoutes: React.FC = () => (
    <Suspense fallback={<div>Yükleniyor…</div>}>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    </Suspense>
);

export default AuthRoutes;