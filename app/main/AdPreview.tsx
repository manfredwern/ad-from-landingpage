import { Metadata } from '@/interfaces';
import React from 'react';
import Card from '../components/Card/Card';

interface AdPreviewProps {
  data: Metadata;
}

const AdPreview: React.FC<AdPreviewProps> = ({ data }) => {
  return (
    <>
      <div>
        <Card className="mt-4 w-80">
          <div className="relative">
            <span className="absolute right-0 top-0 bg-black px-2 py-1 text-xs text-white">Anzeige</span>
            <img src={data.image} alt={data.imageAlt || 'image'} className="h-60 w-80 origin-center object-cover" />
          </div>
          <h2 className="mb-1 mt-2 text-lg font-bold">{data.title}</h2>
          <p className="text-md line-clamp-3 overflow-hidden whitespace-normal empty:hidden">{data.description}</p>
          <p className="mt-4 text-sm empty:hidden">{data.siteName}</p>
        </Card>
      </div>
    </>
  );
};
export default AdPreview;
