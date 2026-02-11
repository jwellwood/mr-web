# Form Container Testing Examples

This folder contains comprehensive test examples for the FormContainer component.

## Files

- **FormContainer.test.tsx** - Tests for the form container component (15 tests)

## Testing Approach

### FormContainer

Tests focus on:

- ✅ **Rendering** - Children display, loading states, error messages
- ✅ **Form Submission** - Submit button interactions, form event handling
- ✅ **Button Configuration** - Custom text, disabled states, fullWidth settings
- ✅ **Reset Button** - Optional reset button rendering and functionality
- ✅ **Loading States** - Spinner display, submit button loading state
- ✅ **Error Handling** - Apollo error display and styling
- ✅ **Layout** - MUI Container and Stack layout verification
- ✅ **Accessibility** - Form roles, button accessibility

## Key Patterns

### Testing Form Submission

```typescript
it('calls onSubmit when form is submitted', async () => {
  const user = userEvent.setup();
  const mockOnSubmit = vi.fn();

  render(
    <FormContainer onSubmit={mockOnSubmit} loading={false}>
      <div>Form content</div>
    </FormContainer>
  );

  const submitButton = screen.getByRole('button', { name: /submit/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Loading State

```typescript
it('shows loading spinner when loading is true', () => {
  render(
    <FormContainer onSubmit={vi.fn()} loading={true}>
      <div>Form content</div>
    </FormContainer>
  );

  // Children should not be visible during loading
  expect(screen.queryByText('Form content')).not.toBeInTheDocument();
});
```

### Testing Error Display

```typescript
it('displays error message when error is provided', () => {
  const mockError = {
    message: 'GraphQL Error',
    graphQLErrors: [],
    networkError: null,
  };

  render(
    <FormContainer onSubmit={vi.fn()} loading={false} error={mockError}>
      <div>Form content</div>
    </FormContainer>
  );

  expect(screen.getByText('GraphQL Error')).toBeInTheDocument();
});
```

### Testing Button Configuration

```typescript
it('renders submit button with custom text', () => {
  render(
    <FormContainer
      onSubmit={vi.fn()}
      loading={false}
      submitBtn={{ text: 'Save Changes', disabled: false, fullWidth: true }}
    >
      <div>Form content</div>
    </FormContainer>
  );

  expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
});
```

## Value Format

- **onSubmit**: Function called with form submit event
- **children**: React nodes rendered in form
- **submitBtn**: Object with text, disabled, fullWidth properties
- **resetBtn**: Optional React element for reset button
- **loading**: Boolean for loading state
- **error**: Apollo error object with message property

## ARIA Roles Reference

- `form`: The form element
- `button`: Submit and reset buttons

## What NOT to Test

- Internal MUI component implementation details
- Exact styling values (test presence, not pixel-perfect)
- SubmitButton internal loading spinner implementation
- MutationError component internal structure

## Running Tests

```bash
# Run all form container tests
npx vitest src/components/forms/form-container/test

# Run with coverage
npx vitest src/components/forms/form-container/test --coverage

# Run in watch mode
npx vitest watch src/components/forms/form-container/test
```

## Common Patterns

### Testing Form Layout

```typescript
it('renders children in proper layout', () => {
  render(
    <FormContainer onSubmit={vi.fn()} loading={false}>
      <TextField label="Name" />
      <TextField label="Email" />
    </FormContainer>
  );

  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
});
```

### Testing Button States

```typescript
it('disables submit button when specified', () => {
  render(
    <FormContainer
      onSubmit={vi.fn()}
      loading={false}
      submitBtn={{ disabled: true }}
    >
      <div>Form content</div>
    </FormContainer>
  );

  expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
});
```

## Notes

- Form submission prevents default browser behavior
- Loading state hides form content and shows spinner
- Submit button uses SubmitButton component with loading prop
- Error display uses MutationError component
- Container has bottom margin of 4px
- Children are rendered in MUI Stack with spacing
