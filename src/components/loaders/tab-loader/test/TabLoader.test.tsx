import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TabLoader from '../TabLoader';

describe('TabLoader', () => {
  it('renders circular progress in tab area', () => {
    render(<TabLoader />);
    // MUI CircularProgress renders with role 'progressbar'
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
