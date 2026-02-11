import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import NoDataText from '../no-data-text/NoDataText';

describe('NoDataText', () => {
  it('renders children inside Alert', () => {
    render(<NoDataText>No items</NoDataText>);
    expect(screen.getByText('No items')).toBeInTheDocument();
  });

  it('renders a link when `link` prop is provided', () => {
    render(
      <MemoryRouter>
        <NoDataText link="/some/path">Go</NoDataText>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/some/path');
  });
});
