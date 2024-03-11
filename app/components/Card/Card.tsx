import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`rounded-lg bg-white p-4 shadow-md ${className}`}>{children}</div>;
};
