import { Card } from '@/components';
import { Metadata } from '@/interfaces';
import React from 'react';

interface AdPreviewProps {
  metadata: Metadata;
}

const AdPreview: React.FC<AdPreviewProps> = ({ metadata }) => {
  return (
    <Card className="mt-4 w-80">
      <div className="relative">
        <span className="absolute right-0 top-0 bg-black px-2 py-1 text-xs text-white" aria-label="Advertisement">
          Advertisement
        </span>
        <img src={metadata.image} alt={metadata.imageAlt || 'image'} className="h-60 w-80 origin-center object-cover" aria-label="Image" />
      </div>
      <h2 className="mb-1 mt-2 text-lg font-bold" aria-label="Title">
        {metadata.title}
      </h2>
      <p className="text-md line-clamp-3 overflow-hidden whitespace-normal empty:hidden" aria-label="Description">
        {metadata.description}
      </p>
      <p className="mt-4 text-sm empty:hidden" aria-label="Site Name">
        {metadata.siteName}
      </p>
    </Card>
  );
};
export default AdPreview;
