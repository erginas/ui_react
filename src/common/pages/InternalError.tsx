// src/common/pages/InternalError.tsx
import React from 'react';
import {Link} from 'react-router-dom';

export const InternalError: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-6xl font-bold text-red-400">500</h1>
        <p className="text-2xl mt-4">Sunucu hatası oluştu</p>
        <Link to="/" className="mt-6 text-blue-600 hover:underline">
            Anasayfaya Dön
        </Link>
    </div>
);