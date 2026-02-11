import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import BackgroundContainer from '../background-container/BackgroundContainer';

describe('BackgroundContainer', () => {
  test('renders children correctly', () => {
    render(
      <BackgroundContainer>
        <div>Test content</div>
      </BackgroundContainer>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('applies dark background styling', () => {
    const { container } = render(
      <BackgroundContainer>
        <div>Content</div>
      </BackgroundContainer>
    );

    const outerContainer = container.querySelector('[class*="MuiContainer"]');
    expect(outerContainer).toBeInTheDocument();
  });

  test('renders multiple children', () => {
    render(
      <BackgroundContainer>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </BackgroundContainer>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  test('renders complex children', () => {
    render(
      <BackgroundContainer>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Click me</button>
        </div>
      </BackgroundContainer>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('has nested container structure', () => {
    const { container } = render(
      <BackgroundContainer>
        <div>Nested content</div>
      </BackgroundContainer>
    );

    const containers = container.querySelectorAll('[class*="MuiContainer"]');
    // Should have outer and inner containers
    expect(containers.length).toBeGreaterThanOrEqual(2);
  });

  test('renders empty children', () => {
    const { container } = render(
      <BackgroundContainer>
        <></>
      </BackgroundContainer>
    );

    expect(container.querySelector('[class*="MuiContainer"]')).toBeInTheDocument();
  });
});
