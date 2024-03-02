'use client';

import Input from '@/app/components/Input/Input';
import { useState } from 'react';
import Button from '../components/Button/Button';
import { HTMLMetadata, parseHTML, parseMetadata } from '../utils/htmlParser';
import AdPreview from './AdPreview';

interface FormData {
  url: string;
}

export default function Main() {
  const [formData, setFormData] = useState<FormData>({
    url: ''
  });

  const [metadata, setMetadata] = useState<{ [key: string]: string }[] | undefined>(undefined);

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
    getContentHtmlApi(formData);
  };

  const getContentHtmlApi = async (formData: FormData) => {
    const postBody = JSON.stringify(formData);
    const result = await fetch('http://localhost:3000/api/get-html', {
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
  };

  const initValue = 'https://www.merkur.de/sport/wintersport/boesch-ruecktritt-comeback-ski-ass-kampf-kindheit-traum-92864908.html';

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-center text-xl">Build an display Ad from metadata!</h1>

      <br />
      <form onSubmit={handleSubmit}>
        <Input type="text" name="url" onChange={handleChange} placeholder="Website URL" label="URL" required></Input>

        <Button type="submit" disabled={!formData.url}>
          Fetch Metadata
        </Button>
      </form>

      <br />
      <div className="align-center flex flex-row justify-center">{metadata && <AdPreview data={parseMetadata(metadata)}></AdPreview>}</div>
    </div>
  );
}
