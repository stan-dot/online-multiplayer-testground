import React from 'react';
import { render, screen } from '@testing-library/react';
import OldAp from './page';

test('renders learn react link', () => {
  render(<OldAp />);
  const linkElement = screen.getByText(/Welcome to Snekden/i);
  expect(linkElement).toBeInTheDocument();
});
