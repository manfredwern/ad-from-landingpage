'use client';

import Input from '@/app/components/Input/Input';
import { useState } from 'react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import { HTMLMetadata, parseHTML, parseMetadata } from '../utils/htmlParser';
import AdPreview from './AdPreview';
import Loading from './loading';

interface FormData {
  url: string;
}

export default function Main() {
  const [formData, setFormData] = useState<FormData>({
    url: ''
  });

  const [metadata, setMetadata] = useState<{ [key: string]: string }[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log(formData);
    setLoading(true);
    getContentHtmlApi(formData);
  };

  const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;

  const getContentHtmlApi = async (formData: FormData) => {
    const postBody = JSON.stringify(formData);
    const result = await fetch(API_ENDPOINT + '/get-html', {
      method: 'POST',
      body: postBody
    });

    const dataJson = await result.json();
    const htmlString = dataJson.data;
    const metadata: HTMLMetadata | null = parseHTML(htmlString);

    if (metadata) {
      console.log(metadata.title);
      console.log(metadata.meta);
      if (metadata.meta) {
        // Process metadata to get only necessary properties
        // console.log('parsing ', parseMetadata(metadata.meta));
        setMetadata(metadata.meta);
      }
    }
    setLoading(false);
  };

  const initValue = 'https://www.merkur.de/sport/wintersport/boesch-ruecktritt-comeback-ski-ass-kampf-kindheit-traum-92864908.html';

  return (
    <div className="gap- flex flex-col gap-7">
      <h1 className="text-center text-xl">Create a Display Ad for you Landing page.</h1>

      <form onSubmit={handleSubmit}>
        <Input type="text" name="url" onChange={handleChange} placeholder="Website URL" label="URL" required></Input>
        <Button type="submit" disabled={!formData.url}>
          Generate preview
        </Button>
      </form>

      <div className="align-center flex flex-row justify-center">
        {loading && (
          <Card className="mt-4 flex min-h-80 w-80 flex-col justify-center text-center">
            <Loading />
          </Card>
        )}
        {metadata && !loading && <AdPreview data={parseMetadata(metadata)}></AdPreview>}
      </div>
    </div>
  );
}
