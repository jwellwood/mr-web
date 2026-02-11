# Form Stepper Testing Examples

This folder contains comprehensive test examples for the FormStepper component.

## Files

- **FormStepper.test.tsx** - Tests for the form stepper component (15 tests)

## Testing Approach

### FormStepper

Tests focus on:

- ✅ **Rendering** - Children content, stepper dots, back button
- ✅ **Step Navigation** - Active step highlighting, step count
- ✅ **Back Button** - Enable/disable states, click handling
- ✅ **Edge Cases** - Single step, multiple steps, empty steps, out of bounds
- ✅ **Styling** - Theme colors, positioning, variant
- ✅ **Accessibility** - Button roles, navigation states

## Key Patterns

### Testing Back Button Functionality

```typescript
it('calls handleBack when back button is clicked', async () => {
  const user = userEvent.setup();
  const mockHandleBack = vi.fn();

  render(
    <FormStepper
      steps={mockSteps}
      activeStep={1}
      handleBack={mockHandleBack}
    >
      <div>Form Content</div>
    </FormStepper>
  );

  const backButton = screen.getByRole('button', { name: /back/i });
  await user.click(backButton);

  expect(mockHandleBack).toHaveBeenCalledTimes(1);
});
```

### Testing Back Button States

```typescript
it('disables back button on first step', () => {
  render(
    <FormStepper steps={mockSteps} activeStep={0}>
      <div>Form Content</div>
    </FormStepper>
  );

  expect(screen.getByRole('button', { name: /back/i })).toBeDisabled();
});

it('enables back button on steps after first', () => {
  render(
    <FormStepper steps={mockSteps} activeStep={1}>
      <div>Form Content</div>
    </FormStepper>
  );

  expect(screen.getByRole('button', { name: /back/i })).not.toBeDisabled();
});
```

### Testing Step Configuration

```typescript
const mockSteps = [
  <div key="step1">Step 1</div>,
  <div key="step2">Step 2</div>,
  <div key="step3">Step 3</div>,
];

render(
  <FormStepper steps={mockSteps} activeStep={1}>
    <div>Current Step Content</div>
  </FormStepper>
);
```

## Value Format

- **steps**: Array of React nodes representing each step
- **activeStep**: Number indicating current active step (0-based)
- **handleBack**: Optional function called when back button clicked
- **children**: React node for current step content

## ARIA Roles Reference

- `button`: Back navigation button

## What NOT to Test

- Internal MUI MobileStepper implementation details
- Exact dot styling or positioning (test presence, not appearance)
- Theme color exact values (test application, not specific colors)
- Step dot click behavior (component doesn't implement next button)

## Running Tests

```bash
# Run all form stepper tests
npx vitest src/components/forms/form-stepper/test

# Run with coverage
npx vitest src/components/forms/form-stepper/test --coverage

# Run in watch mode
npx vitest watch src/components/forms/form-stepper/test
```

## Common Patterns

### Testing Step Navigation

```typescript
it('handles step transitions', () => {
  const { rerender } = render(
    <FormStepper steps={mockSteps} activeStep={0}>
      <div>Step 1 Content</div>
    </FormStepper>
  );

  expect(screen.getByText('Step 1 Content')).toBeInTheDocument();

  // Simulate step change
  rerender(
    <FormStepper steps={mockSteps} activeStep={1}>
      <div>Step 2 Content</div>
    </FormStepper>
  );

  expect(screen.getByText('Step 2 Content')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /back/i })).not.toBeDisabled();
});
```

### Testing Edge Cases

```typescript
it('handles single step scenario', () => {
  const singleStep = [<div>Only Step</div>];

  render(
    <FormStepper steps={singleStep} activeStep={0}>
      <div>Content</div>
    </FormStepper>
  );

  expect(screen.getByRole('button', { name: /back/i })).toBeDisabled();
});

it('handles empty steps array', () => {
  render(
    <FormStepper steps={[]} activeStep={0}>
      <div>Content</div>
    </FormStepper>
  );

  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

## Notes

- Back button is disabled on first step (activeStep === 0)
- Stepper uses dots variant with position="top"
- Background uses secondary theme color
- No next button is rendered (nextButton={false})
- Component handles out-of-bounds activeStep gracefully
- Steps array can be empty (renders 0 dots)
- Children content is rendered below the stepper
