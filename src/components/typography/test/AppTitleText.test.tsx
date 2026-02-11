import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppTitleText from '../app-title-text/AppTitleText';

describe('AppTitleText', () => {
  it('renders children and applies large font-size and bold weight', () => {
    render(<AppTitleText>My App</AppTitleText>);
    const el = screen.getByText('My App');
    expect(el).toBeInTheDocument();
    const style = window.getComputedStyle(el);
    // fontSize may be reported as '3rem' or resolved '48px' depending on environment
    expect(['3rem', '48px'].includes(style.fontSize)).toBe(true);
    expect(['bold', '700'].includes(style.fontWeight) || Number(style.fontWeight) >= 700).toBe(
      true
    );
  });

  it('accepts a color prop and renders text', () => {
    render(<AppTitleText color="primary">Title</AppTitleText>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
