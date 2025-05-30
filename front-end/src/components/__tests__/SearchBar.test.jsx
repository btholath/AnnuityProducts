/** @jest-environment jsdom */
/* global describe, it, expect, jest */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar.jsx';

describe('SearchBar', () => {
  it('renders search input and triggers search handler', () => {
    const mockSearchHandler = jest.fn();
    const mockAddHandler = jest.fn();

    render(
      <SearchBar
        searchTerm=""
        handleSearch={mockSearchHandler}
        onAddClick={mockAddHandler}
      />
    );

    const input = screen.getByPlaceholderText(/search policies/i);
    const button = screen.getByText(/add new policy/i);

    // Simulate typing
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockSearchHandler).toHaveBeenCalled();

    // Simulate clicking add button
    fireEvent.click(button);
    expect(mockAddHandler).toHaveBeenCalled();
  });
});
