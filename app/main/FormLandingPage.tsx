import Input from '@/components/Input/Input';
import React, { useState } from 'react';
import Button from '../components/Button/Button';
import { isValidURL } from '../utils/validatorHelper';

interface FormLandingPageProps {
  onSubmit: (url: FormData) => void;
}

interface FormData {
  url: string;
}

const FormLandingPage: React.FC<FormLandingPageProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    url: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value: url } = e.target;

    // Validate URL
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
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="url" onChange={handleChange} placeholder="Enter a Landing page URL" label="Landing Page" errorMessage={error} required></Input>
        <Button type="submit" disabled={!formData.url || !!error}>
          Generate preview
        </Button>
      </form>
    </>
  );
};

export default FormLandingPage;
