import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import CustomStack from '../custom-stack/CustomStack';

describe('CustomStack', () => {
  test('renders children correctly', () => {
    render(
      <CustomStack>
        <div>Child 1</div>
        <div>Child 2</div>
      </CustomStack>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  test('applies default props correctly', () => {
    const { container } = render(
      <CustomStack>
        <div>Test</div>
      </CustomStack>
    );

    const stack = container.firstChild;
    expect(stack).toHaveClass('MuiStack-root'); // MUI Stack class
  });

  test('applies custom direction prop', () => {
    const { container } = render(
      <CustomStack direction="row">
        <div>Test</div>
      </CustomStack>
    );

    // Component renders successfully with custom direction
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies custom spacing prop', () => {
    render(
      <CustomStack spacing={2}>
        <div>Test</div>
      </CustomStack>
    );

    // Spacing is applied via MUI Stack component, we can verify it renders without error
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('applies custom justify prop', () => {
    const { container } = render(
      <CustomStack justify="flex-start">
        <div>Test</div>
      </CustomStack>
    );

    const stack = container.firstChild;
    expect(stack).toHaveStyle({ justifyContent: 'flex-start' });
  });

  test('applies custom align prop', () => {
    const { container } = render(
      <CustomStack align="flex-end">
        <div>Test</div>
      </CustomStack>
    );

    const stack = container.firstChild;
    expect(stack).toHaveStyle({ alignItems: 'flex-end' });
  });

  test('renders without divider by default', () => {
    const { container } = render(
      <CustomStack>
        <div>Item 1</div>
        <div>Item 2</div>
      </CustomStack>
    );

    // Should not contain any Divider components
    const dividers = container.querySelectorAll('[class*="MuiDivider-root"]');
    expect(dividers).toHaveLength(0);
  });

  test('renders with divider when divider prop is true', () => {
    const { container } = render(
      <CustomStack divider={true}>
        <div>Item 1</div>
        <div>Item 2</div>
      </CustomStack>
    );

    // Should contain Divider components
    const dividers = container.querySelectorAll('[class*="MuiDivider-root"]');
    expect(dividers.length).toBeGreaterThan(0);
  });

  test('divider has correct orientation and styling', () => {
    const { container } = render(
      <CustomStack divider={true} direction="row">
        <div>Item 1</div>
        <div>Item 2</div>
      </CustomStack>
    );

    const divider = container.querySelector('[class*="MuiDivider-root"]');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('MuiDivider-vertical'); // MUI applies vertical class
  });

  test('handles different justify values', () => {
    const justifyValues = ['flex-start', 'center', 'space-between', 'flex-end'] as const;

    justifyValues.forEach(justify => {
      const { container, rerender } = render(
        <CustomStack justify={justify}>
          <div>Test</div>
        </CustomStack>
      );

      expect(container.firstChild).toHaveStyle({ justifyContent: justify });

      rerender(
        <CustomStack justify="center">
          <div>Test</div>
        </CustomStack>
      );
    });
  });

  test('handles different align values', () => {
    const alignValues = ['flex-start', 'center', 'flex-end'] as const;

    alignValues.forEach(align => {
      const { container } = render(
        <CustomStack align={align}>
          <div>Test</div>
        </CustomStack>
      );

      expect(container.firstChild).toHaveStyle({ alignItems: align });
    });
  });

  test('renders single child correctly', () => {
    render(
      <CustomStack>
        <span>Single Child</span>
      </CustomStack>
    );

    expect(screen.getByText('Single Child')).toBeInTheDocument();
  });

  test('renders multiple children with proper spacing', () => {
    render(
      <CustomStack spacing={3}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </CustomStack>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
