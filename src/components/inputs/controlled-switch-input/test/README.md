# Switch Input Testing Examples

This folder contains comprehensive test examples for the switch input components.

## Files

- **CustomSwitch.test.tsx** - Tests for the presentational component (14 tests)
- **ControlledSwitchInput.test.tsx** - Integration tests with react-hook-form (10 tests)

## Testing Approach

### CustomSwitch (Presentational Component)

Tests focus on:

- ✅ **Rendering** - Labels, default states
- ✅ **Toggle Interactions** - Clicking, keyboard (spacebar)
- ✅ **Accessibility** - Keyboard access, ARIA roles (checkbox)
- ✅ **Error Display** - Shows/hides error messages
- ✅ **Props** - Disabled state, color variants, controlled state
- ✅ **Callbacks** - onCheck handler
- ✅ **JSX Labels** - Supports ReactElement as label

### ControlledSwitchInput (React Hook Form Wrapper)

Tests focus on:

- ✅ **Form Integration** - Connects to react-hook-form control
- ✅ **State Management** - Updates boolean form values on toggle
- ✅ **Form Submission** - Boolean values flow to onSubmit
- ✅ **Accessibility** - Keyboard navigation works with form
- ✅ **Dynamic Updates** - Watching and responding to changes
- ✅ **Type Safety** - Ensures boolean values (not strings)

## Key Patterns

### Testing Switch Toggle

```typescript
it('calls onCheck when toggled', async () => {
  const user = userEvent.setup();
  const onCheck = vi.fn();

  render(
    <TestWrapper>
      <CustomSwitch label="Enable feature" onCheck={onCheck} errors={[]} />
    </TestWrapper>
  );

  const switchElement = screen.getByRole('checkbox');
  await user.click(switchElement);

  expect(onCheck).toHaveBeenCalledTimes(1);
});
```

### Testing Keyboard Interaction

```typescript
it('is accessible via keyboard', async () => {
  const user = userEvent.setup();
  const onCheck = vi.fn();

  render(<CustomSwitch label="Feature" onCheck={onCheck} errors={[]} />);

  await user.tab();
  const switchElement = screen.getByRole('checkbox');
  expect(switchElement).toHaveFocus();

  await user.keyboard(' '); // Space bar toggles switch
  expect(onCheck).toHaveBeenCalled();
});
```

### Testing Form Integration

```typescript
interface FormValues {
  enabled?: boolean;
}

function TestForm({ defaultValues = {}, onSubmit = () => {} }) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledSwitchInput control={control} name="enabled" label="Enable Feature" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Testing Boolean Values

```typescript
it('submits form with correct boolean value', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<TestForm defaultValues={{ enabled: false }} onSubmit={onSubmit} />);

  const switchElement = screen.getByRole('checkbox');
  await user.click(switchElement);

  const submitButton = screen.getByText('Submit');
  await user.click(submitButton);

  await waitFor(() => {
    const [[data]] = onSubmit.mock.calls;
    expect(data.enabled).toBe(true);
    expect(typeof data.enabled).toBe('boolean');
  });
});
```

### Testing Controlled State

```typescript
it('handles controlled state', () => {
  const { rerender } = render(
    <CustomSwitch label="Controlled" checked={false} errors={[]} />
  );

  let switchElement = screen.getByRole('checkbox');
  expect(switchElement).not.toBeChecked();

  rerender(<CustomSwitch label="Controlled" checked={true} errors={[]} />);

  switchElement = screen.getByRole('checkbox');
  expect(switchElement).toBeChecked();
});
```

### Testing Dynamic Form Values

```typescript
function ControlledForm() {
  const { control, watch } = useForm<FormValues>({
    defaultValues: { enabled: false },
  });

  const currentValue = watch('enabled');

  return (
    <>
      <ControlledSwitchInput control={control} name="enabled" label="Feature" />
      <div data-testid="current-value">{String(currentValue)}</div>
    </>
  );
}

// Verify reactive updates
expect(screen.getByTestId('current-value')).toHaveTextContent('false');
await user.click(switchElement);
expect(screen.getByTestId('current-value')).toHaveTextContent('true');
```

## ARIA Roles Reference

MUI Switch components use:

- **`switch`** - The switch element

```typescript
// Use this role in tests
screen.getByRole('switch');
```

## What NOT to Test

- ❌ MUI internal switch animation
- ❌ React Hook Form internal validation
- ❌ Browser-specific toggle behavior
- ❌ CSS class names (test behavior, not implementation)

## Running Tests

```bash
# Run all switch input tests
npx vitest src/components/inputs/controlled-switch-input/test

# Run with coverage
npx vitest src/components/inputs/controlled-switch-input/test --coverage

# Run in watch mode
npx vitest watch src/components/inputs/controlled-switch-input/test
```

## Common Patterns

### Testing Toggle State

```typescript
// Check if checked
expect(switchElement).toBeChecked();

// Check if unchecked
expect(switchElement).not.toBeChecked();
```

### Testing Error Display

```typescript
const error = { message: 'This field is required' };

render(<CustomSwitch label="Accept terms" errors={[error]} />);

expect(screen.getByText('This field is required')).toBeInTheDocument();
```

### Testing Color Variants

```typescript
render(<CustomSwitch label="Primary" color="primary" errors={[]} />);

const switchElement = screen.getByRole('switch');
expect(switchElement).toBeInTheDocument();
```

## Notes

- **ARIA Role**: Switch renders with `role="switch"`
- **Keyboard**: Spacebar toggles the switch
- **TypeScript**: Form values should be typed as `boolean`
- **TestWrapper**: All tests use `TestWrapper` to provide MUI theme context
- **userEvent**: Prefer `userEvent` over `fireEvent` for realistic user interactions
- **Boolean Values**: Always verify type is `boolean`, not string ("true"/"false")
