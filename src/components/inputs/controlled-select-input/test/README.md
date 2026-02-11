# Select Input Testing Examples

This folder contains comprehensive test examples for the select input components.

## Files

- **SelectInput.test.tsx** - Tests for the presentational component (18 tests)
- **ControlledSelectInput.test.tsx** - Integration tests with react-hook-form (10 tests)

## Testing Approach

### SelectInput (Presentational Component)

Tests focus on:

- ✅ **Rendering** - Labels, options, default values
- ✅ **Menu Interactions** - Opening/closing dropdown
- ✅ **Selection** - Clicking options, keyboard navigation
- ✅ **Accessibility** - Keyboard access, ARIA roles (combobox/listbox)
- ✅ **Error Display** - Shows/hides error messages
- ✅ **Props** - Disabled state, numeric values, many options
- ✅ **Callbacks** - onChange handler

### ControlledSelectInput (React Hook Form Wrapper)

Tests focus on:

- ✅ **Form Integration** - Connects to react-hook-form control
- ✅ **State Management** - Updates form values on selection
- ✅ **Form Submission** - Selected values flow to onSubmit
- ✅ **Accessibility** - Keyboard navigation works with form
- ✅ **Dynamic Updates** - Watching and responding to changes
- ✅ **Edge Cases** - Empty selections, numeric values, many options

## Key Patterns

### Testing MUI Select Interactions

```typescript
// Open the dropdown
const select = screen.getByRole('combobox');
await user.click(select);

// Select an option from the listbox
const option = screen.getByRole('option', { name: 'Option Two' });
await user.click(option);

// Verify selection
expect(select).toHaveTextContent('Option Two');
```

### Testing Keyboard Navigation

```typescript
it('can navigate with arrow keys', async () => {
  const user = userEvent.setup();

  const select = screen.getByRole('combobox');
  await user.click(select);

  await user.keyboard('{ArrowDown}');
  await user.keyboard('{Enter}');

  expect(onChange).toHaveBeenCalled();
});
```

### Testing Form Integration

```typescript
interface FormValues {
  color?: string;
}

function TestForm({ defaultValues = {}, onSubmit = () => {} }) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledSelectInput
        control={control}
        name="color"
        label="Color"
        options={mockOptions}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Testing Disabled Options

```typescript
it('handles options with disabled state', async () => {
  const optionsWithDisabled = [
    { label: 'Option One', value: '1' },
    { label: 'Option Two (Disabled)', value: '2', disabled: true },
  ];

  render(<SelectInput options={optionsWithDisabled} />);

  await user.click(select);

  const disabledOption = screen.getByRole('option', { name: 'Option Two (Disabled)' });
  expect(disabledOption).toHaveClass('Mui-disabled');
});
```

### Testing with Numeric Values

```typescript
interface NumericFormValues {
  count?: number;
}

const numericOptions = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
];

<ControlledSelectInput
  control={control}
  name="count"
  label="Count"
  options={numericOptions}
/>
```

## ARIA Roles Reference

MUI Select components use specific ARIA roles:

- **`combobox`** - The select trigger element
- **`listbox`** - The dropdown menu container
- **`option`** - Individual menu items

```typescript
// Use these roles in tests
screen.getByRole('combobox'); // The select element
screen.getByRole('listbox'); // The dropdown (when open)
screen.getByRole('option', { name: 'Red' }); // Menu item
```

## What NOT to Test

- ❌ MUI internal dropdown positioning logic
- ❌ React Hook Form internal validation
- ❌ Browser-specific select behavior
- ❌ CSS class names (test behavior, not implementation)

## Running Tests

```bash
# Run all select input tests
npx vitest src/components/inputs/controlled-select-input/test

# Run with coverage
npx vitest src/components/inputs/controlled-select-input/test --coverage

# Run in watch mode
npx vitest watch src/components/inputs/controlled-select-input/test
```

## Common Patterns

### Closing the Menu

```typescript
// Press Escape to close
await user.keyboard('{Escape}');

// Or click outside (on backdrop)
await user.click(document.body);
```

### Testing Controlled Form Values

```typescript
function ControlledForm() {
  const { control, watch } = useForm({ defaultValues: { color: 'red' } });
  const currentColor = watch('color');

  return (
    <>
      <ControlledSelectInput control={control} name="color" options={options} />
      <div data-testid="current-value">{currentColor}</div>
    </>
  );
}

// Verify reactive updates
expect(screen.getByTestId('current-value')).toHaveTextContent('red');
```

## Notes

- **Menu Height**: SelectInput sets `maxHeight: 300` via MenuProps for long option lists
- **TypeScript**: Always define form value interfaces for type safety
- **TestWrapper**: All tests use `TestWrapper` to provide MUI theme context
- **userEvent**: Prefer `userEvent` over `fireEvent` for realistic user interactions
