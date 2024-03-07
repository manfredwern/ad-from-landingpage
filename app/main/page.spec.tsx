import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Main from './page';

describe('Main component', () => {
  it('should render the title correctly', () => {
    render(<Main />);
    const titleElement = screen.getByText('Adify: Ad Creation Made Easy');
    expect(titleElement).toBeInTheDocument();
  });
});
