import React from 'react';
import {useTheme} from "../../../theme.ts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const { colors, spacing, radii, fontSizes } = useTheme();
  const bg = variant === 'primary' ? colors.primary : colors.secondary;
  return (
    <button
      style={{
        backgroundColor: bg,
        padding: spacing.sm + ' ' + spacing.md,
        borderRadius: radii.md,
        fontSize: fontSizes.base,
        color: colors.surface,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
