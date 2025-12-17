import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div className={`glass-panel rounded-2xl p-6 ${hoverEffect ? 'glass-panel-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};
