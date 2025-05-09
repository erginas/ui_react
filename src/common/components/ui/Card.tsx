// src/common/components/Card.tsx

import {motion} from 'framer-motion';
import React from 'react';

export interface CardProps {
    title?: string;
    value?: React.ReactNode; // sayılardan ziyade JSX bileşenlerini desteklemek için
    children?: React.ReactNode;
    onClick?: () => void; // tıklanabilirlik desteği
    color?: string; // arka plan rengi
    className?: string; // ekstra stil sınıfları
}

export const Card: React.FC<CardProps> = ({
                                              title,
                                              value,
                                              children,
                                              onClick,
                                              color = "bg-white",
                                              className = "",
                                          }) => {
    return (
        <motion.div
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            transition={{type: "spring", stiffness: 300, damping: 20}}
            className={`
        p-3 sm:p-4 rounded-xl shadow-sm text-center cursor-pointer
        ${color} 
        ${onClick ? 'hover:shadow-md' : ''}
        ${className}
      `}
            onClick={onClick}
        >
            {title && (
                <h3 className="text-xs font-medium text-gray-700 mb-1">{title}</h3>
            )}
            {value && (
                <p className="text-lg font-bold text-gray-800">{value}</p>
            )}
            {children && <div className="mt-2">{children}</div>}
        </motion.div>
    );
};