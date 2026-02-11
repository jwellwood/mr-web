import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatSkeleton from '../StatSkeleton';

describe('StatSkeleton', () => {
  it('renders small skeleton', () => {
    const { container } = render(<StatSkeleton />);
    const skeleton = container.querySelector('.MuiSkeleton-root');
    expect(skeleton).toBeInTheDocument();
  });
});
