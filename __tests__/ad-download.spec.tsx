import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AdDownload from '../app/main/components/ad-download';

describe('Download Preview', () => {
  // Mock the fetch function
  const mockFetch = jest.fn();
  (global as any).fetch = mockFetch;

  const metadata = {
    url: 'https://example.com',
    title: 'Mock Title',
    image: 'https://example.com/image.jpg',
    imageAlt: 'Mock Image Alt',
    description: 'Mock Description',
    siteName: 'Example Site'
  };

  let downloadButton: HTMLButtonElement;

  beforeEach(() => {
    render(<AdDownload metadata={metadata} />);
    downloadButton = screen.getByText('Download Preview');

    mockFetch.mockClear(); // Clear mock function calls before each test
  });
  it('should call handleDownload when button is clicked', async () => {
    fireEvent.click(downloadButton);

    // Wait for the asynchronous operation to complete
    const mockResponse = { ok: true, blob: jest.fn(() => Promise.resolve(new Blob([''], { type: 'text/html' }))) };
    const mockBlob = mockFetch.mockResolvedValueOnce(mockResponse);

    expect(mockBlob).toHaveBeenCalled();
  });

  it('should handle failure in fetching data', async () => {
    // Mock the fetch function to return a rejected Promise
    global.fetch = mockFetch.mockRejectedValue(new Error('Failed to fetch data'));

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Trigger the button click event
    fireEvent.click(downloadButton);

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching data', expect.any(Error));
    });

    consoleErrorMock.mockRestore();
  });
});
