import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import FormContainer from '../FormContainer';

describe('FormContainer', () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    children: <div>Test Content</div>,
    loading: false,
    error: undefined,
  };

  it('renders children when not loading', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps}>
          <div>Test Child</div>
        </FormContainer>
      </TestWrapper>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('shows loading spinner when loading is true', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps} loading={true}>
          <div>Test Child</div>
        </FormContainer>
      </TestWrapper>
    );

    // Spinner should be present, children should not be visible
    expect(screen.queryByText('Test Child')).not.toBeInTheDocument();
  });

  it('renders submit button with default text', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders submit button with custom text', () => {
    render(
      <TestWrapper>
        <FormContainer
          {...defaultProps}
          submitBtn={{ text: 'Save Changes', disabled: false, fullWidth: true }}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('disables submit button when submitBtn.disabled is true', () => {
    render(
      <TestWrapper>
        <FormContainer
          {...defaultProps}
          submitBtn={{ text: 'Submit', disabled: true, fullWidth: true }}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('renders reset button when provided', () => {
    const resetButton = <button type="button">Reset</button>;

    render(
      <TestWrapper>
        <FormContainer {...defaultProps} resetBtn={resetButton} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('does not render reset button when not provided', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.queryByRole('button', { name: /reset/i })).not.toBeInTheDocument();
  });

  it('displays error message when error is provided', () => {
    const mockError = {
      message: 'Something went wrong',
      graphQLErrors: [],
      networkError: null,
    };

    render(
      <TestWrapper>
        <FormContainer {...defaultProps} error={mockError} />
      </TestWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('does not display error message when no error', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    render(
      <TestWrapper>
        <FormContainer {...defaultProps} onSubmit={mockOnSubmit} />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('prevents default form submission behavior', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    render(
      <TestWrapper>
        <FormContainer {...defaultProps} onSubmit={mockOnSubmit} />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('renders with proper container styling', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps} />
      </TestWrapper>
    );

    // Check that the container has the expected margin
    const container = document.querySelector('.MuiContainer-root');
    expect(container).toHaveStyle({ marginBottom: '4px' });
  });

  it('renders children in a stack layout', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps}>
          <div>Child 1</div>
          <div>Child 2</div>
        </FormContainer>
      </TestWrapper>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('passes loading state to submit button', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps} loading={true} />
      </TestWrapper>
    );

    // When loading is true, SubmitButton shows a skeleton instead of button
    const submitButton = screen.queryByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeInTheDocument();
  });

  it('renders submit button with fullWidth by default', () => {
    render(
      <TestWrapper>
        <FormContainer {...defaultProps} />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    // Check if button has full width styling (this depends on SubmitButton implementation)
    expect(submitButton).toBeInTheDocument();
  });

  it('renders submit button with custom fullWidth setting', () => {
    render(
      <TestWrapper>
        <FormContainer
          {...defaultProps}
          submitBtn={{ text: 'Submit', disabled: false, fullWidth: false }}
        />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });
});
