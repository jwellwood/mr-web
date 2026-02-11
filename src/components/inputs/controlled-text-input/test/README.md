# Text Input Testing Examples

This folder contains comprehensive test examples for the text input components.

## Files

- **TextInput.test.tsx** - Tests for the presentational component
- **ControlledTextInput.test.tsx** - Integration tests with react-hook-form

## Testing Approach

### TextInput (Presentational Component)

Tests focus on:

- ✅ **Rendering** - Labels, default values, placeholders
- ✅ **User Interactions** - Typing, blurring (using `userEvent`)
- ✅ **Accessibility** - Keyboard navigation, ARIA attributes
- ✅ **Error Display** - Shows/hides error messages
- ✅ **Props** - Password mode, multiline, disabled states
- ✅ **Callbacks** - onChange, onBlur handlers

### ControlledTextInput (React Hook Form Wrapper)

Tests focus on:

- ✅ **Form Integration** - Connects to react-hook-form control
- ✅ **State Management** - Updates form values on user input
- ✅ **Form Submission** - Data flows to onSubmit handler
- ✅ **Error Handling** - Errors only show after field is touched
- ✅ **Accessibility** - Keyboard navigation works with form
- ✅ **Props Forwarding** - Password, multiline, placeholder work correctly

## Key Patterns

### Using userEvent Instead of fireEvent

```typescript
// ✅ Preferred - Realistic user interactions
const user = userEvent.setup();
await user.type(input, 'text');
await user.tab(); // blur

// ❌ Avoid - Lower-level DOM events
fireEvent.change(input, { target: { value: 'text' } });
```

### Testing Form Integration

```typescript
function TestForm({ defaultValues = {}, onSubmit = () => {} }) {
  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextInput control={control} name="email" label="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Testing Accessibility

```typescript
it('is keyboard accessible', async () => {
  const user = userEvent.setup();
  render(<TextInput {...props} />);

  await user.tab();
  expect(screen.getByLabelText('Name')).toHaveFocus();
});
```

### Testing Error Display

```typescript
it('displays error message when error is provided', () => {
  render(
    <TextInput
      errors={[{ type: 'required', message: 'This field is required' }]}
    />
  );

  expect(screen.getByText('This field is required')).toBeInTheDocument();
});
```

## What NOT to Test

- ❌ MUI internal implementation details
- ❌ React Hook Form internal validation logic
- ❌ Browser-specific rendering differences
- ❌ CSS class names (test behavior, not implementation)

## Running Tests

```bash
# Run all text input tests
npx vitest src/components/inputs/controlled-text-input/test

# Run with coverage
npx vitest src/components/inputs/controlled-text-input/test --coverage

# Run in watch mode
npx vitest watch src/components/inputs/controlled-text-input/test
```

## Notes

- **Validation Rules**: This component doesn't accept `rules` prop. Validation is handled at the form level (e.g., with Zod schema or react-hook-form's register rules).
- **Error Timing**: Errors only display after the field is touched (`isTouched && error`), which is tested in the controlled component tests.
- **TestWrapper**: All tests use `TestWrapper` to provide MUI theme context.
