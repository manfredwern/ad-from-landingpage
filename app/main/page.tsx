'use client';

import { useState } from 'react';
import Card from '../components/Card/Card';
import { apiEndpoint } from '../utils/apiHelper';
import { HTMLMetadata, parseHTML, parseMetadata } from '../utils/htmlParser';
import AdDownload from './AdDownload';
import AdPreview from './AdPreview';
import FormLandingPage from './FormLandingPage';
import Loading from './loading';

interface FormData {
  url: string;
}

export default function Main() {
  const [metadata, setMetadata] = useState<{ [key: string]: string }[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    getContentHtmlApi(formData);
  };

  const getContentHtmlApi = async (formData: FormData): Promise<void> => {
    try {
      const postBody = JSON.stringify(formData);
      const result = await fetch(apiEndpoint() + '/get-html', {
        method: 'POST',
        body: postBody
      });

      if (!result.ok) {
        throw new Error('Failed to fetch HTML content');
      }

      const dataJson = await result.json();
      const htmlString = dataJson.data;
      const metadata: HTMLMetadata | null = parseHTML(htmlString);

      if (metadata && metadata.meta) {
        // Process metadata to get only necessary properties
        setMetadata(metadata.meta);
      } else {
        throw new Error('Failed to parse metadata');
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
      setError((error as any).message as string);
      // Handle error state or display error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold text-gray-800">Adify: Ad Creation Made Easy</h1>

      <FormLandingPage onSubmit={handleSubmit}></FormLandingPage>

      <div className="align-center flex flex-row justify-center">
        {loading && (
          <Card className="mt-4 flex min-h-80 w-80 flex-col justify-center text-center">
            <Loading />
          </Card>
        )}
        {metadata && !loading && (
          <>
            <AdPreview data={parseMetadata(metadata)}></AdPreview>
          </>
        )}

        {error && !loading && <p className="mt-2 text-center text-red-500">{error}</p>}
      </div>
      <div>{metadata && <AdDownload metadata={parseMetadata(metadata)}></AdDownload>}</div>
    </div>
  );
}
