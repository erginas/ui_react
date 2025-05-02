// common/components/Card.tsx
import { motion } from 'framer-motion';
import React from 'react';

export interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <motion.div
    className="p-4 rounded-2xl shadow-md bg-white"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div>{children}</div>
  </motion.div>
);