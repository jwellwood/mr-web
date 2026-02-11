import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LazyLoader from '../LazyLoader';

describe('LazyLoader', () => {
  it('renders linear progress', () => {
    render(<LazyLoader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies fullHeight when prop is true', () => {
    const { container } = render(<LazyLoader fullHeight={true} />);
    const box = container.querySelector('div');
    expect(box).toBeInTheDocument();
  });
});
