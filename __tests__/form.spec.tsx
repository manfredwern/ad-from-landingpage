import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form from '../app/main/components/form';

// Mock the fetch function
const mockFetch = jest.fn();
(global as any).fetch = mockFetch;
describe('Preview Form', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    mockFetch.mockClear();
  });

  it('should submit the form with a Valid URL', async () => {
    // Mock onSubmit, isLoading, and hasError functions
    const onSubmit = jest.fn();
    const isLoading = jest.fn();
    const hasError = jest.fn();
    render(<Form onSubmit={onSubmit} hasError={hasError} isLoading={isLoading} />);

    // Fill in the URL input
    const urlInput = screen.getByLabelText('Landing Page');
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });

    // Mock the fetch response
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({ data: 'mock HTML content' }) };
    mockFetch.mockResolvedValueOnce(mockResponse);

    // Submit the form
    const submitButton = screen.getByRole('button');
    fireEvent.submit(submitButton, { name: 'Generate preview' });

    // Ensure that loading state is activated
    expect(isLoading).toHaveBeenCalledWith(true);

    // Wait for the API call to finish and loading state to be deactivated
    await waitFor(() => {
      // Ensure that the onSubmit function was called
      expect(onSubmit).toHaveBeenCalled();
    });

    // Ensure that loading state is deactivated
    expect(isLoading).toHaveBeenCalledWith(false);
  });
});
