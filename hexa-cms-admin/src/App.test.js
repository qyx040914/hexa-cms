import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CMS welcome title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Hexa-CMS 欢迎您/i);
  expect(titleElement).toBeInTheDocument();
});
