import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import CustomGridItem from '../custom-grid/CustomGridItem';

describe('CustomGridItem', () => {
  test('renders children correctly', () => {
    render(
      <CustomGridItem>
        <span>Test Content</span>
      </CustomGridItem>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies default props correctly', () => {
    const { container } = render(
      <CustomGridItem>
        <div>Test</div>
      </CustomGridItem>
    );

    const gridItem = container.firstChild;
    expect(gridItem).toHaveStyle({ textAlign: 'center' });
    expect(gridItem).toHaveClass('MuiGrid-root'); // MUI Grid class
  });

  test('applies custom size prop', () => {
    const { container } = render(
      <CustomGridItem size={12}>
        <div>Test</div>
      </CustomGridItem>
    );

    // Component renders successfully with custom size
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies custom textAlign prop', () => {
    const { container } = render(
      <CustomGridItem textAlign="left">
        <div>Test</div>
      </CustomGridItem>
    );

    const gridItem = container.firstChild;
    expect(gridItem).toHaveStyle({ textAlign: 'left' });
  });

  test('applies different textAlign values', () => {
    const { rerender, container } = render(
      <CustomGridItem textAlign="right">
        <div>Test</div>
      </CustomGridItem>
    );

    expect(container.firstChild).toHaveStyle({ textAlign: 'right' });

    rerender(
      <CustomGridItem textAlign="center">
        <div>Test</div>
      </CustomGridItem>
    );

    expect(container.firstChild).toHaveStyle({ textAlign: 'center' });
  });

  test('renders complex children', () => {
    render(
      <CustomGridItem>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
        </div>
      </CustomGridItem>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });
});
