// src/common/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full p-6">
    <h1 className="text-6xl font-bold text-gray-400">404</h1>
    <p className="text-2xl mt-4">Sayfa bulunamadı</p>
    <Link to="/" className="mt-6 text-blue-600 hover:underline">
      Anasayfaya Dön
    </Link>
  </div>
);