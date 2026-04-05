import { render, screen } from '@testing-library/react';
import '../../../../i18n/react-i18n';
import { describe, it, expect } from 'vitest';
import type { TypedFormError } from '../../types';
import FormErrorMessage from '../FormErrorMessage';

describe('FormErrorMessage', () => {
  it('renders the provided error message', () => {
    const error = { message: 'This field is required', type: 'required' } as TypedFormError;
    render(<FormErrorMessage error={error} />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders the default message when error has no message', () => {
    const error = { type: 'validate' } as TypedFormError;
    render(<FormErrorMessage error={error} />);
    expect(screen.getByText('This entry is invalid')).toBeInTheDocument();
  });

  it('renders different error messages', () => {
    const messages = ['Too short', 'Invalid format', 'Required field'];
    messages.forEach(message => {
      const { unmount } = render(
        <FormErrorMessage error={{ message, type: 'custom' } as TypedFormError} />
      );
      expect(screen.getByText(message)).toBeInTheDocument();
      unmount();
    });
  });

  it('interpolates meta values into translations', () => {
    const error = { type: 'too_small', meta: { min: 3 } } as TypedFormError;
    render(<FormErrorMessage error={error} />);
    expect(screen.getByText(/minimum\s*3|mínimo\s*3/i)).toBeInTheDocument();
  });
});
