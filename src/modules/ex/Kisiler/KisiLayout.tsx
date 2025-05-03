// src/modules/User/UserLayout.tsx
import React from 'react';
import {Outlet} from 'react-router-dom';
import {AppLayout} from '../../common/components/ui/AppLayout.tsx';

const KisiLayout: React.FC = () => (
    <AppLayout title="Kullanıcı Yönetimi">
        <Outlet/>
    </AppLayout>
);

export default KisiLayout;