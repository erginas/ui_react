// src/modules/Personel/router.tsx

import React, {lazy} from 'react';
import PersonelCreatePage from "./pages/PersonelCreatePage.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import AktifPersonelList from "./pages/AktifPersonelList.tsx";
import PersonelDetail from "./pages/personelDetail.tsx";


const Dashboard = lazy(() => import("./pages/Dashboard"));

const PersonelRoutess: React.FC = () => (
    <React.Suspense fallback={<div>Yükleniyor…</div>}>
        <Routes>
            <Route index element={<Navigate to="dashboard" replace/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="aktif" element={<AktifPersonelList/>}/>
            <Route path="create" element={<PersonelCreatePage/>}/>
            <Route path=":id" element={<PersonelDetail/>}/>
        </Routes>
    </React.Suspense>
);

export default PersonelRoutess;