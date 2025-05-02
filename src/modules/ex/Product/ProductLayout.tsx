// src/modules/Product/ProductLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppLayout } from '../../../common/components/ui/AppLayout';

const ProductLayout: React.FC = () => (
  <AppLayout title="Ürün Yönetimi">
    <Outlet />
  </AppLayout>
);

export default ProductLayout;