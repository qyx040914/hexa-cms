import { render, screen } from '@testing-library/react';
import App from './App';

test('renders admin layout title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Hexa CMS 管理后台/i);
  expect(titleElement).toBeInTheDocument();
});
