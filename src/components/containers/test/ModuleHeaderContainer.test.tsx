import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ModuleHeaderContainer from '../module-header-container/ModuleHeaderContainer';

describe('ModuleHeaderContainer', () => {
  test('renders children correctly', () => {
    render(
      <ModuleHeaderContainer>
        <h1>Module Header</h1>
      </ModuleHeaderContainer>
    );

    expect(screen.getByText('Module Header')).toBeInTheDocument();
  });

  test('renders as Box component', () => {
    const { container } = render(
      <ModuleHeaderContainer>
        <div>Content</div>
      </ModuleHeaderContainer>
    );

    expect(container.querySelector('[class*="MuiBox"]')).toBeInTheDocument();
  });

  test('renders multiple children', () => {
    render(
      <ModuleHeaderContainer>
        <div>First element</div>
        <div>Second element</div>
        <div>Third element</div>
      </ModuleHeaderContainer>
    );

    expect(screen.getByText('First element')).toBeInTheDocument();
    expect(screen.getByText('Second element')).toBeInTheDocument();
    expect(screen.getByText('Third element')).toBeInTheDocument();
  });

  test('renders complex nested children', () => {
    render(
      <ModuleHeaderContainer>
        <div>
          <h2>Title</h2>
          <p>Description</p>
          <button>Action</button>
        </div>
      </ModuleHeaderContainer>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  test('renders empty children', () => {
    const { container } = render(
      <ModuleHeaderContainer>
        <></>
      </ModuleHeaderContainer>
    );

    expect(container.querySelector('[class*="MuiBox"]')).toBeInTheDocument();
  });

  test('handles text content', () => {
    render(<ModuleHeaderContainer>Plain text content</ModuleHeaderContainer>);

    expect(screen.getByText('Plain text content')).toBeInTheDocument();
  });

  test('handles fragments', () => {
    render(
      <ModuleHeaderContainer>
        <>
          <span>Fragment child 1</span>
          <span>Fragment child 2</span>
        </>
      </ModuleHeaderContainer>
    );

    expect(screen.getByText('Fragment child 1')).toBeInTheDocument();
    expect(screen.getByText('Fragment child 2')).toBeInTheDocument();
  });
});
