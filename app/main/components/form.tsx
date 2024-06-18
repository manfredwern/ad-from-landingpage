import { Button, Input } from '@/components';
import { FormData, HTMLMetadata, Metadata } from '@/interfaces';
import { parseHTML, parseMetadata } from '@/utils/htmlParser';
import { isValidURL } from '@/utils/validatorHelper';
import React, { useState } from 'react';

interface FormProps {
  onSubmit: (metadata: Metadata | null) => void;
  isLoading: (loading: boolean) => void;
  hasError: (error: string | null) => void;
}

const DEMO_URL = 'https://www.freenet.de/auto/neuheiten/mclaren-artura-spider-mehr-power-mehr-sound-weniger-dach-40480454.html';

const Form: React.FC<FormProps> = ({ onSubmit, isLoading, hasError }) => {
  const [formData, setFormData] = useState<FormData>({
    url: DEMO_URL
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    getContentHtmlApi(formData);
  };

  const getContentHtmlApi = async (formData: FormData): Promise<void> => {
    try {
      const postBody = JSON.stringify(formData);
      const result = await fetch('/api/get-html', {
        method: 'POST',
        body: postBody
      });

      if (!result.ok) {
        throw new Error('Failed to fetch HTML content');
      }

      const dataJson = await result.json();
      const htmlString = dataJson.data;
      const metadata: HTMLMetadata | null = parseHTML(htmlString);

      if (metadata?.meta) {
        // Process metadata to get only necessary properties
        onSubmit(parseMetadata(metadata.meta));
        hasError(null);
      } else {
        throw new Error('Failed to parse metadata');
      }
    } catch (error) {
      // console.error('Error fetching HTML content:', error);
      hasError((error as any).message as string);
      onSubmit(null);
    } finally {
      isLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value: url } = e.target;

    if (!isValidURL(url)) {
      setError('Please enter a valid URL.');
    }

    if (error && isValidURL(url)) {
      setError(null); // Clear error state if the input value becomes valid
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: url
    }));
  };

  const handleResetForm = () => {
    setFormData({ url: '' });
    onSubmit(null);
    hasError(null);
    setError(null);
    document.getElementById('input-url')?.focus;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="url"
        id="input-url"
        value={formData.url}
        onChange={handleChange}
        placeholder="Enter URL"
        label="Landing Page URL"
        errorMessage={error}
        required
      ></Input>
      <div className="flex flex-row justify-between">
        <Button type="submit" disabled={!formData.url || !!error}>
          Generate preview
        </Button>
        <Button type="button" onClick={handleResetForm}>
          Reset form
        </Button>
      </div>
    </form>
  );
};

export default Form;
