/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppContent from '../../AppContent.jsx';

// ✅ Mock Okta
jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    authState: { isAuthenticated: false, isPending: false },
    oktaAuth: { signInWithRedirect: jest.fn() }
  })
}));

// ✅ Mock Vite environment variables
jest.mock('../../utils/env', () => ({
  API_BASE_URL: 'http://localhost:3000'
}));

test('displays login prompt when not authenticated', () => {
  render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>
  );
  expect(screen.getByText(/please log in to continue/i)).toBeInTheDocument();
});
