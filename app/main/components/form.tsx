import Input from '@/components/Input/Input';
import { FormData, HTMLMetadata, Metadata } from '@/interfaces';
import { parseHTML, parseMetadata } from '@/utils/htmlParser';
import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { isValidURL } from '../../utils/validatorHelper';

interface FormProps {
  onSubmit: (metadata: Metadata | null) => void;
  isLoading: (loading: boolean) => void;
  hasError: (error: string | null) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, isLoading, hasError }) => {
  const [formData, setFormData] = useState<FormData>({
    url: ''
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
      console.error('Error fetching HTML content:', error);
      hasError((error as any).message as string);
      onSubmit(null);
      // Handle error state or display error message to the user
    } finally {
      isLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value: url } = e.target;

    if (!isValidURL(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    if (error && isValidURL(url)) {
      setError(null); // Clear error state if the input value becomes valid
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: url
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="url" onChange={handleChange} placeholder="Enter a Landing page URL" label="Landing Page" errorMessage={error} required></Input>
      <Button type="submit" disabled={!formData.url || !!error}>
        Generate preview
      </Button>
    </form>
  );
};

export default Form;
