import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomAlert from '../custom-alert/CustomAlert';

describe('CustomAlert', () => {
  it('renders alert text', () => {
    render(<CustomAlert type="success" text="Test alert" />);
    expect(screen.getByText('Test alert')).toBeInTheDocument();
  });

  it('renders an alert element with given severity', () => {
    render(<CustomAlert type="warning" text="Warning message" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
