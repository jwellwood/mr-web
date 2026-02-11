# Multi-Select Input Testing Examples

This folder contains comprehensive test examples for the multi-select input components.

## Files

- **MultiSelectInput.test.tsx** - Tests for the presentational component (13 tests)
- **ControlledMultiSelectInput.test.tsx** - Integration tests with react-hook-form (11 tests)

## Testing Approach

### MultiSelectInput (Presentational Component)

Tests focus on:

- ✅ **Rendering** - Labels, options display
- ✅ **Menu Interactions** - Opening/closing, checkbox selection
- ✅ **Display Modes** - Show labels vs. show count
- ✅ **Error Display** - Shows/hides error messages
- ✅ **Selection State** - Checkboxes show selected state
- ✅ **Props** - isDirty, isValid for label styling
- ✅ **Many Options** - Scrollable list with maxHeight

### ControlledMultiSelectInput (React Hook Form Wrapper)

Tests focus on:

- ✅ **Form Integration** - Connects to react-hook-form control
- ✅ **State Management** - Updates string form values (comma-separated)
- ✅ **Form Submission** - Selected values flow to onSubmit
- ✅ **Accessibility** - Keyboard navigation works with form
- ✅ **Display Options** - showLabels configuration
- ✅ **Dynamic Updates** - Watching and responding to changes

## Key Patterns

### Testing Multi-Select Rendering

```typescript
const mockOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
];

render(
  <MultiSelectInput
    options={mockOptions}
    value="red,blue"  // Comma-separated string
    label="Colors"
    onChange={onChange}
    errors={[]}
  />
);
```

### Opening the Dropdown

```typescript
it('opens dropdown menu when clicked', async () => {
  const user = userEvent.setup();

  render(<MultiSelectInput options={mockOptions} value="" label="Colors" onChange={onChange} errors={[]} />);

  const select = screen.getByLabelText('Colors');
  await user.click(select);

  expect(screen.getByRole('listbox')).toBeInTheDocument();
});
```

### Testing Checkboxes

```typescript
it('displays checkboxes for each option', async () => {
  const user = userEvent.setup();

  render(<MultiSelectInput options={mockOptions} value="" label="Colors" onChange={onChange} errors={[]} />);

  const select = screen.getByLabelText('Colors');
  await user.click(select);

  expect(screen.getAllByRole('checkbox')).toHaveLength(3);
});
```

### Testing Selected State

```typescript
it('marks selected options with checked checkboxes', async () => {
  const user = userEvent.setup();

  render(<MultiSelectInput options={mockOptions} value="red,blue" label="Colors" onChange={onChange} errors={[]} />);

  const select = screen.getByLabelText('Colors');
  await user.click(select);

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes[0]).toBeChecked(); // Red
  expect(checkboxes[1]).not.toBeChecked(); // Green
  expect(checkboxes[2]).toBeChecked(); // Blue
});
```

### Testing Display Modes

```typescript
// Show count (default)
render(
  <MultiSelectInput
    value="red,blue"
    label="items"
    showLabels={false}
    // ...props
  />
);
expect(screen.getByText(/2 items/i)).toBeInTheDocument();

// Show labels
render(
  <MultiSelectInput
    value="red,blue"
    label="Colors"
    showLabels={true}
    // ...props
  />
);
// Selected labels will be shown as chips
```

### Testing Form Integration

```typescript
interface FormValues {
  colors?: string;  // Comma-separated string
}

function TestForm({ defaultValues = {}, onSubmit = () => {} }) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledMultiSelectInput
        control={control}
        name="colors"
        label="Colors"
        options={mockOptions}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Testing Form Submission

```typescript
it('submits form with selected values', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<TestForm defaultValues={{ colors: 'red,green' }} onSubmit={onSubmit} />);

  const submitButton = screen.getByText('Submit');
  await user.click(submitButton);

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: 'red,green',
      }),
      expect.anything()
    );
  });
});
```

### Testing Dynamic Form Values

```typescript
function ControlledForm() {
  const { control, watch } = useForm<FormValues>({
    defaultValues: { colors: 'red' },
  });

  const currentColors = watch('colors');

  return (
    <>
      <ControlledMultiSelectInput
        control={control}
        name="colors"
        label="Colors"
        options={mockOptions}
      />
      <div data-testid="current-value">{currentColors}</div>
    </>
  );
}

// Verify reactive updates
expect(screen.getByTestId('current-value')).toHaveTextContent('red');
```

## Value Format

- **Type**: String (comma-separated values)
- **Single selection**: `"red"`
- **Multiple selections**: `"red,blue,green"`
- **No selection**: `""`

## ARIA Roles Reference

MUI Multi-Select uses:

- **Select element**: Query with `getByLabelText`
- **`listbox`** - The dropdown menu (when open)
- **`option`** - Individual menu items
- **`checkbox`** - Checkboxes for each option

```typescript
const select = screen.getByLabelText('Colors');
const listbox = screen.getByRole('listbox'); // When menu is open
const options = screen.getAllByRole('option');
const checkboxes = screen.getAllByRole('checkbox');
```

## What NOT to Test

- ❌ MUI internal menu rendering and positioning
- ❌ React Hook Form internal validation
- ❌ Checkbox click handling (tested by MUI)
- ❌ CSS styling details

## Running Tests

```bash
# Run all multi-select input tests
npx vitest src/components/inputs/controlled-multiselect-input/test

# Run with coverage
npx vitest src/components/inputs/controlled-multiselect-input/test --coverage

# Run in watch mode
npx vitest watch src/components/inputs/controlled-multiselect-input/test
```

## Common Patterns

### Finding Elements

```typescript
// The select component
const select = screen.getByLabelText('Colors');

// Open dropdown first, then query listbox
await user.click(select);
const listbox = screen.getByRole('listbox');

// Options (after opening dropdown)
const redOption = screen.getByRole('option', { name: 'Red' });

// All checkboxes (after opening dropdown)
const checkboxes = screen.getAllByRole('checkbox');
```

### Testing Error State

```typescript
const error = { message: 'At least one color is required' };

render(
  <MultiSelectInput
    value=""
    label="Colors"
    errors={[error]}
    // ...props
  />
);

expect(screen.getByText('At least one color is required')).toBeInTheDocument();

// Error styling on select
const select = screen.getByLabelText('Colors');
expect(select).toHaveClass('Mui-error');
```

### Testing Many Options

```typescript
const manyOptions = Array.from({ length: 30 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: `item-${i + 1}`,
}));

render(<MultiSelectInput options={manyOptions} value="" label="Items" onChange={onChange} errors={[]} />);

await user.click(select);
expect(screen.getAllByRole('option')).toHaveLength(30);
```

## Notes

- **Menu Height**: Component sets `maxHeight: 300` via MenuProps for long option lists
- **Value Format**: Always use comma-separated string (not array)
- **TypeScript**: Form values should be typed as `string`
- **TestWrapper**: All tests use `TestWrapper` to provide MUI theme context
- **userEvent**: Prefer `userEvent` over `fireEvent` for realistic user interactions
- **Display Modes**: `showLabels={true}` shows selected labels as chips, `showLabels={false}` shows count
- **Label Styling**: `isDirty` and `isValid` props control label color
