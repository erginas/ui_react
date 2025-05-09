// src/types/ui.ts
export interface StatCardProps {
    label: string;
    value: number;
    color?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}