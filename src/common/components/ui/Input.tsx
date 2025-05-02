// src/common/components/Input.tsx
import React, { InputHTMLAttributes } from 'react';
import { useTheme } from '../../../theme.ts';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const { colors, spacing, radii } = useTheme();
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <input
        className="px-3 py-2 border rounded-md focus:outline-none"
        style={{
          borderColor: colors.muted,
          borderRadius: radii.sm,
        }}
        {...props}
      />
    </div>
  );
};