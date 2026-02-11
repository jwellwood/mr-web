import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('renders circular progress', () => {
    render(<Spinner />);
    // MUI CircularProgress renders with role 'progressbar'
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
