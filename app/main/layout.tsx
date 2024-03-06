import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-md">{children}</div>;
}
