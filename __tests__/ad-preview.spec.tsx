import { Metadata } from '@/interfaces';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AdPreview from '../app/main/components/ad-preview';

describe('Ad Preview', () => {
  it('should render an ad preview from a metadata', () => {
    const metadataMock: Metadata = {
      url: 'https://example.com',
      title: 'Mock Title',
      image: 'https://example.com/image.jpg',
      imageAlt: 'Mock Image Alt',
      description: 'Mock Description',
      type: 'website',
      siteName: 'Example Site'
    };

    render(<AdPreview metadata={metadataMock} />);

    const title = screen.getByText(metadataMock.title);
    expect(title).toBeInTheDocument();

    const image = screen.queryByAltText(metadataMock.imageAlt) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(metadataMock.image);

    const description = screen.getByText(metadataMock.description);
    expect(description).toBeInTheDocument();

    const advertisement = screen.getByText('Advertisement');
    expect(advertisement).toBeInTheDocument();

    const siteName = screen.getByText(metadataMock.siteName);
    expect(siteName).toBeInTheDocument();
  });

  it('should not show Site Name if empty', () => {
    const metadataMock: Metadata = {
      url: 'https://example.com',
      title: 'Mock Title',
      image: 'https://example.com/image.jpg',
      imageAlt: 'Mock Image Alt',
      description: 'Mock Description',
      type: 'website',
      siteName: ''
    };

    render(<AdPreview metadata={metadataMock} />);

    const siteName = screen.queryByText('Example Site');
    expect(siteName).not.toBeInTheDocument();
  });
});
