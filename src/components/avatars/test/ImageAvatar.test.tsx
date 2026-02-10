import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import ImageAvatar from '../image-avatar/ImageAvatar';

describe('ImageAvatar', () => {
  it('renders img when imageUrl provided', () => {
    render(<ImageAvatar imageUrl="/path/to/img.jpg" alt="MyAvatar" />);
    expect(screen.getByAltText('MyAvatar')).toBeInTheDocument();
  });

  it('renders fallback icon when no imageUrl', () => {
    const { container } = render(<ImageAvatar imageUrl={undefined} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
