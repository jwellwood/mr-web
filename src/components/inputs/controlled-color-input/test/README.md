# Color Input Testing Examples

This folder contains comprehensive test examples for the color input components.

## Files

- **ColorInput.test.tsx** - Tests for the presentational component (12 tests)
- **ControlledColorInput.test.tsx** - Integration tests with react-hook-form (9 tests)

## Testing Approach

### ColorInput (Presentational Component)

Tests focus on:

- ✅ **Rendering** - Labels, default values
- ✅ **Color Input** - HTML5 color picker input type
- ✅ **User Interactions** - Selecting colors
- ✅ **Error Display** - Shows/hides error messages
- ✅ **Props** - Disabled state, hex values
- ✅ **Callbacks** - onChange handler
- ✅ **Color Formats** - Hex colors (#RRGGBB)

### ControlledColorInput (React Hook Form Wrapper)

Tests focus on:

- ✅ **Form Integration** - Connects to react-hook-form control
- ✅ **State Management** - Updates string form values on color change
- ✅ **Form Submission** - Hex color values flow to onSubmit
- ✅ **Dynamic Updates** - Watching and responding to changes
- ✅ **Color Values** - Proper hex format handling

## Key Patterns

### Testing Color Input Rendering

```typescript
it('renders with default value', () => {
  const onChange = vi.fn();

  render(
    <TestWrapper>
      <ColorInput
        inputName="color"
        label="Primary Color"
        defaultValue="#ff0000"
        onChange={onChange}
      />
    </TestWrapper>
  );

  const colorInput = screen.getByDisplayValue('#ff0000');
  expect(colorInput).toBeInTheDocument();
});
```

### Finding Color Inputs

Since color inputs don't have accessible labels in the traditional sense, use a selector:

```typescript
const colorInput = screen.getByLabelText('', { selector: 'input[type="color"]' });
```

### Testing Color Changes

```typescript
it('calls onChange when color is selected', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  render(<ColorInput inputName="color" label="Theme Color" onChange={onChange} />);

  const colorInput = screen.getByLabelText('', { selector: 'input[type="color"]' });

  await user.clear(colorInput);
  await user.type(colorInput, '#00ff00');

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
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledColorInput control={control} name="color" label="Theme Color" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Testing Hex Color Values

```typescript
it('handles hex color values correctly', () => {
  render(<TestForm defaultValues={{ color: '#336699' }} />);

  const colorInput = screen.getByLabelText('', { selector: 'input[type="color"]' });
  expect(colorInput).toHaveValue('#336699');
});
```

### Testing Dynamic Form Values

```typescript
function ControlledForm() {
  const { control, watch } = useForm<FormValues>({
    defaultValues: { color: '#ff0000' },
  });

  const currentColor = watch('color');

  return (
    <>
      <ControlledColorInput control={control} name="color" label="Color" />
      <div data-testid="current-value">{currentColor}</div>
    </>
  );
}

// Verify reactive updates
expect(screen.getByTestId('current-value')).toHaveTextContent('#ff0000');
```

### Testing Error Display

```typescript
const error = { message: 'Invalid color' };

render(<ColorInput inputName="color" label="Color" onChange={onChange} errors={[error]} />);

expect(screen.getByText('Invalid color')).toBeInTheDocument();
```

## Color Format Notes

- **Hex Format**: Colors use 6-digit hex format `#RRGGBB`
- **Case Normalization**: Browsers normalize hex values to lowercase (`#FF0000` → `#ff0000`)
- **Input Type**: Uses HTML5 `<input type="color">` which provides native color picker
- **Default Value**: Most browsers default to `#000000` (black) if no value provided

## What NOT to Test

- ❌ Browser's native color picker UI
- ❌ React Hook Form internal validation
- ❌ Color format conversion (browser handles this)
- ❌ CSS styling of the color picker

## Running Tests

```bash
# Run all color input tests
npx vitest src/components/inputs/controlled-color-input/test

# Run with coverage
npx vitest src/components/inputs/controlled-color-input/test --coverage

# Run in watch mode
npx vitest watch src/components/inputs/controlled-color-input/test
```

## Common Patterns

### Selecting the Color Input

```typescript
// Best way to select color input
const colorInput = screen.getByLabelText('', { selector: 'input[type="color"]' });

// By display value
const colorInput = screen.getByDisplayValue('#ff0000');

// By attribute
screen.getByLabelText('', { selector: 'input[name="color"]' });
```

### Testing Disabled State

```typescript
render(<ColorInput inputName="color" label="Color" onChange={onChange} disabled />);

const colorInput = screen.getByLabelText('', { selector: 'input[type="color"]' });
expect(colorInput).toBeDisabled();
```

## Notes

- **TypeScript**: Form color values should be typed as `string` (hex format)
- **TestWrapper**: All tests use `TestWrapper` to provide MUI theme context
- **userEvent**: Prefer `userEvent` over `fireEvent` for realistic user interactions
- **Hex Values**: Always use 6-digit hex format with `#` prefix
- **Case**: Expect lowercase hex values in assertions (browser normalization)
