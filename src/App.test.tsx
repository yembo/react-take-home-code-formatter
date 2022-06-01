import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Checks for Column', () => {
  render(<App />);
  const linkElement = screen.getByText(/Unformatted/i);
  expect(linkElement).toBeInTheDocument();
});
