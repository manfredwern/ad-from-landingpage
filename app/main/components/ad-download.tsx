import { Button } from '@/components';
import { Metadata } from '@/interfaces';
import React from 'react';

const AdDownload: React.FC<{ metadata: Metadata }> = ({ metadata }) => {
  const handleDownload = async () => {
    try {
      const res = await fetch('/api/html-to-zip', {
        method: 'POST',
        body: JSON.stringify(metadata)
      });
      const resBlob = await res.blob();
      downloadFile(resBlob);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const downloadFile = (fileBlob: Blob): void => {
    const url = URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ad-landing-page.zip';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} className="w-full rounded-full px-4 py-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 mt-1 inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8l5 5m0 0l5-5m-5 5V3"></path>
      </svg>
      Download as HTML (zip)
    </Button>
  );
};

export default AdDownload;
