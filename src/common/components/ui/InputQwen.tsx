// src/common/components/ui/Input.tsx

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    register?: Function; // react-hook-form register fonksiyonu
    name?: string;
    readOnly?: boolean;
}

export const Input: React.FC<InputProps> = ({label, error, register, name, readOnly = false, ...props}) => {
    const inputProps = register ? register(name) : {};

    return (
        <div className="space-y-1 w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            )}
            <input
                id={name}
                {...inputProps}
                {...props}
                readOnly={readOnly}
                className={`w-full border rounded px-3 py-1 ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};