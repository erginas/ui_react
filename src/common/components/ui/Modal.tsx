// src/common/components/Modal.tsx
import React, { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../theme.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { radii } = useTheme();
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <motion.div
        className="bg-white p-6"
        style={{ borderRadius: radii.lg }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {children}
      </motion.div>
    </Dialog>
  );
};