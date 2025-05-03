// src/modules/User/router.tsx
import React, {lazy, Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));
const Settings = lazy(() => import('./pages/Settings.tsx'));

const KisiRoutes: React.FC = () => (
    <Suspense fallback={<div>Yükleniyor…</div>}>
        <Routes>
            <Route path="/kisi" element={<Navigate to="dashboard" replace/>}/>
            <Route path="/kisi/dashboard" element={<Dashboard/>}/>
            <Route path="/kisi/settings" element={<Settings/>}/>
        </Routes>
    </Suspense>
);

export default KisiRoutes;