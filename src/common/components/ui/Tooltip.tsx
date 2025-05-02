// src/common/components/Tooltip.tsx
import React, { ReactNode } from 'react';
import { Tooltip as HeadlessTooltip } from '@reach/tooltip';
import '@reach/tooltip/styles.css';

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ label, children }) => (
  <HeadlessTooltip label={label} aria-label={label}>
    {children}
  </HeadlessTooltip>
);