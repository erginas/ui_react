// import { lazy } from "react";
//
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Profile = lazy(() => import("./pages/Profile"));
// const Settings = lazy(() => import("./pages/Settings"));
//
// const personelRoutes = [
//   {
//     path: "/personel",
//     children: [
//       { path: "", element: <Dashboard /> },
//       { path: "profile/:id", element: <Profile /> },
//       { path: "settings", element: <Settings /> },
//     ],
//   },
// ];
//
// export default personelRoutes;

// src/modules/Kisiler/router.tsx
import React, {lazy, Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

const Dashboard = lazy(() => import("./pages/Dashboard"));

const PersonelRoutes: React.FC = () => (
    <Suspense fallback={<div>Yükleniyor…</div>}>
        <Routes>
            <Route index element={<Navigate to="dashboard" replace/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
        </Routes>
    </Suspense>
);

export default PersonelRoutes;