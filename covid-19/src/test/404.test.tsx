import React from 'react';
import { render } from '@testing-library/react';
import NotPage from '../components/404';

test('render landing page', () => {
    const { asFragment, getByText } =  render(<NotPage />)
    const h1 = getByText(/Page not found/i);
    const link = getByText(/Go back home/i);

  expect(asFragment()).toMatchSnapshot();
  expect(h1).toBeInTheDocument();
  expect(link).toBeInTheDocument();
})