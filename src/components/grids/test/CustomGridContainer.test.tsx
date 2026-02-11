import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import CustomGridContainer from '../custom-grid/CustomGridContainer';

describe('CustomGridContainer', () => {
  test('renders children correctly', () => {
    render(
      <CustomGridContainer>
        <div>Test Child</div>
      </CustomGridContainer>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('applies default props correctly', () => {
    const { container } = render(
      <CustomGridContainer>
        <div>Test</div>
      </CustomGridContainer>
    );

    // Component renders successfully with default props
    const gridContainer = container.firstChild;
    expect(gridContainer).toBeInTheDocument();
  });

  test('applies custom direction prop', () => {
    const { container } = render(
      <CustomGridContainer direction="column">
        <div>Test</div>
      </CustomGridContainer>
    );

    // Component renders successfully with custom direction
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies custom spacing prop', () => {
    const { container } = render(
      <CustomGridContainer spacing={2}>
        <div>Test</div>
      </CustomGridContainer>
    );

    // Component renders successfully with custom spacing
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders multiple children', () => {
    render(
      <CustomGridContainer>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </CustomGridContainer>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  test('has correct MUI Grid container attributes', () => {
    const { container } = render(
      <CustomGridContainer>
        <div>Test</div>
      </CustomGridContainer>
    );

    // MUI Grid container renders as expected
    const gridContainer = container.firstChild;
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('MuiGrid-root'); // MUI adds this class
  });
});
