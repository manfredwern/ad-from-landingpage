import { Metadata } from '@/interfaces';
import React from 'react';
import Card from '../components/Card/Card';

interface AdPreviewProps {
  data: Metadata;
}

const AdPreview: React.FC<AdPreviewProps> = ({ data }) => {
  return (
    <>
      <Card className="mt-4 w-80">
        <img src={data.image} alt="image" className="h-60 w-80 origin-center object-cover" />
        <h2 className="font-bold">{data.title}</h2>
        <p>{data.description}</p>
      </Card>
    </>
  );
};
export default AdPreview;
