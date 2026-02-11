import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomSkeleton from '../CustomSkeleton';

describe('CustomSkeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<CustomSkeleton />);
    const skeleton = container.querySelector('.MuiSkeleton-root');
    expect(skeleton).toBeInTheDocument();
  });

  it('accepts width and height props', () => {
    const { container } = render(<CustomSkeleton width="50px" height="10px" />);
    const skeleton = container.querySelector('.MuiSkeleton-root');
    expect(skeleton).toBeInTheDocument();
  });
});
