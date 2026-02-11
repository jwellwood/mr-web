# Date Input Testing Examples

This folder contains comprehensive test examples for the date input components.

## Files

- **DateInput.test.tsx** - Tests for the presentational component (13 tests)
- **ControlledDateInput.test.tsx** - Integration tests with react-hook-form (11 tests)

## Testing Approach

### DateInput (Presentational Component)

Tests focus on:

- ✅ **Rendering** - Labels, default values
- ✅ **Date Picker** - MUI MobileDatePicker functionality
- ✅ **User Interactions** - Opening calendar, selecting dates
- ✅ **Error Display** - Shows/hides error messages
- ✅ **Props** - disableFuture, view, openTo configurations
- ✅ **Callbacks** - onChange handler
- ✅ **Date Handling** - Null values, valid/invalid dates

### ControlledDateInput (React Hook Form Wrapper)

Tests focus on:

- ✅ **Form Integration** - Connects to react-hook-form control
- ✅ **State Management** - Updates Date/string form values
- ✅ **Form Submission** - Date values flow to onSubmit
- ✅ **Date Conversion** - Handles both Date objects and date strings
- ✅ **Picker Configuration** - Year view, openTo, disableFuture

## Key Patterns

### Testing Date Input Rendering

```typescript
it('renders with default date value', () => {
  const onChange = vi.fn();
  const defaultDate = new Date('2000-01-01');

  render(
    <TestWrapper>
      <DateInput
        inputName="dob"
        label="Date of Birth"
        defaultValue={defaultDate}
        onChange={onChange}
        disableFuture={true}
      />
    </TestWrapper>
  );

  const input = screen.getByLabelText('Date of Birth');
  expect(input).toBeInTheDocument();
});
```

### Opening the Date Picker

```typescript
it('opens date picker when calendar icon is clicked', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  render(<DateInput label="Date" defaultValue={null} onChange={onChange} disableFuture={true} />);

  const openPickerButton = screen.getByRole('button');
  await user.click(openPickerButton);

  // Calendar dialog is now open
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
```

### Testing Form Integration

```typescript
interface FormValues {
  dateOfBirth?: string | Date;
}

function TestForm({ defaultValues = {}, onSubmit = () => {} }) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledDateInput control={control} name="dateOfBirth" label="Date of Birth" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Testing Date Picker Views

```typescript
// Year-only view
<ControlledDateInput
  control={control}
  name="year"
  label="Birth Year"
  view="year"
/>

// Open to specific view
<ControlledDateInput
  control={control}
  name="date"
  label="Date"
  openTo="year"  // Opens to year picker first
/>
```

### Testing Future Date Restrictions

```typescript
// Disable future dates (default behavior)
<ControlledDateInput
  control={control}
  name="dob"
  label="Date of Birth"
  disableFuture={true}  // Cannot select future dates
/>

// Allow future dates
<ControlledDateInput
  control={control}
  name="appointment"
  label="Appointment Date"
  disableFuture={false}  // Can select future dates
/>
```

### Testing Error Display

```typescript
const error = { message: 'Date is required' };

render(
  <DateInput
    label="Date"
    defaultValue={null}
    onChange={onChange}
    disableFuture={true}
    errors={[error]}
  />
);

expect(screen.getByText('Date is required')).toBeInTheDocument();
```

### Testing Date Conversions

```typescript
// DateInput accepts Date objects
render(<TestForm defaultValues={{ dateOfBirth: new Date('2000-01-01') }} />);

// ControlledDateInput handles string dates
render(<TestForm defaultValues={{ dateOfBirth: '2000-01-01' }} />);
```

## Date Picker Notes

- **Component**: Uses `@mui/x-date-pickers` MobileDatePicker
- **Adapter**: Uses AdapterDateFns for date handling
- **Default Views**: ['year', 'month', 'day']
- **Year View**: Only shows year picker when `view="year"`
- **Future Dates**: Disabled by default with `disableFuture={true}`
- **Null Values**: Supports `null` as default value for empty state

## What NOT to Test

- ❌ MUI DatePicker internal calendar rendering
- ❌ React Hook Form internal date validation
- ❌ Date-fns adapter functionality
- ❌ Browser-specific date input behavior

## Running Tests

```bash
# Run all date input tests
npx vitest src/components/inputs/controlled-date-input/test

# Run with coverage
npx vitest src/components/inputs/controlled-date-input/test --coverage

# Run in watch mode
npx vitest watch src/components/inputs/controlled-date-input/test
```

## Common Patterns

### Finding the Date Input

```typescript
// By label
const input = screen.getByLabelText('Date of Birth');

// Calendar button
const openButton = screen.getByRole('button', { name: /choose date/i });

// Calendar dialog (when open)
const calendar = screen.getByRole('dialog');
```

### Testing Valid/Invalid States

```typescript
<DateInput
  label="Date"
  defaultValue={validDate}
  onChange={onChange}
  disableFuture={true}
  isDirty={true}
  isValid={true}  // Valid state
/>

<DateInput
  label="Date"
  defaultValue={invalidDate}
  onChange={onChange}
  disableFuture={true}
  isDirty={true}
  isValid={false}  // Invalid state
  errors={[{ message: 'Invalid date' }]}
/>
```

### Testing Dynamic Form Values

```typescript
function ControlledForm() {
  const { control, watch } = useForm<FormValues>({
    defaultValues: { dateOfBirth: new Date('2000-01-01') },
  });

  const currentDate = watch('dateOfBirth');

  return (
    <>
      <ControlledDateInput control={control} name="dateOfBirth" label="Date" />
      <div data-testid="current-value">
        {currentDate ? new Date(currentDate).toISOString() : 'No date'}
      </div>
    </>
  );
}
```

## Notes

- **TypeScript**: Form date values can be typed as `Date`, `string`, or `Date | string`
- **TestWrapper**: All tests use `TestWrapper` to provide MUI theme context
- **userEvent**: Prefer `userEvent` over `fireEvent` for realistic user interactions
- **LocalizationProvider**: DateInput wraps picker in LocalizationProvider with AdapterDateFns
- **Date Formats**: Component accepts Date objects and converts from strings internally
- **Default Behavior**: `disableFuture` defaults to `true` in ControlledDateInput
