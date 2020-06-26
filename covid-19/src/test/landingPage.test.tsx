import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from '../components/landingPage';

test('render landing page', () => {
    const { asFragment, getByText } =  render(<LandingPage />)
    const h1 = getByText(/Coronavirus:/i)
    const h3 = getByText(/Seek immediate medical attention if you have serious symptoms/i);
    const h4 = getByText(/Find Health centers by location/i);
    const imgAltText = getByText(/social_distancing/i)

  expect(asFragment()).toMatchSnapshot();
  expect(h1).toBeInTheDocument();
  expect(h3).toBeInTheDocument();
  expect(h4).toBeInTheDocument();
  expect(imgAltText).toBeInTheDocument();
})