'use client';

import { Metadata } from '@/interfaces';
import { useState } from 'react';
import Card from '../components/Card/Card';
import AdDownload from './components/AdDownload';
import AdPreview from './components/AdPreview';
import Form from './components/form';
import Loading from './loading';

export default function Main() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-7">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold text-gray-800">Adify: Ad Creation Made Easy</h1>

      <Form onSubmit={setMetadata} isLoading={setLoading} hasError={setError}></Form>

      <div className="align-center flex flex-row justify-center">
        {loading && (
          <Card className="mt-4 flex min-h-80 w-80 flex-col justify-center text-center">
            <Loading />
          </Card>
        )}
        {metadata && !loading && <AdPreview metadata={metadata}></AdPreview>}

        {error && !loading && <p className="mt-2 text-center text-red-500">{error}</p>}
      </div>
      <div>{metadata && <AdDownload metadata={metadata}></AdDownload>}</div>
    </div>
  );
}
