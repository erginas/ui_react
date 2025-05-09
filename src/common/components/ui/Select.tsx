// src/common/components/ui/Select.tsx

import React from 'react';
import {UseFormRegister} from 'react-hook-form';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    label: string;
    name: string;
    options: SelectOption[];
    register: UseFormRegister<any>;
    error?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
                                                  label,
                                                  name,
                                                  options,
                                                  register,
                                                  error,
                                                  defaultValue,
                                                  disabled = false,
                                                  required = false
                                              }) => {
    return (
        <div className="space-y-1 w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
                id={name}
                {...register(name)}
                defaultValue={defaultValue}
                disabled={disabled}
                className={`w-full border rounded px-3 py-1 ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};