import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressBar from '../progress-bar/ProgressBar';

describe('ProgressBar', () => {
  it('renders loading skeleton when loading is true', () => {
    const { container } = render(<ProgressBar max={10} value={5} loading={true} width={150} />);
    const el = container.firstChild as HTMLElement | null;
    expect(el).toBeTruthy();
    if (el) {
      expect(el.style.width).toBe('150px');
    }
  });

  it('renders progress bar with correct inner width for value less than max', () => {
    const { container } = render(<ProgressBar max={10} value={5} width={200} loading={false} />);
    const outer = container.firstChild as HTMLElement | null;
    expect(outer).toBeTruthy();
    const inner = outer?.querySelector('div');
    expect(inner).toBeTruthy();
    if (inner instanceof HTMLElement) {
      expect(inner.style.width).toBe('50%');
    }
  });

  it('renders expected inner width when value equals max (special case)', () => {
    const { container } = render(<ProgressBar max={5} value={5} width={100} loading={false} />);
    const inner = (container.firstChild as HTMLElement)?.querySelector('div') as HTMLElement | null;
    expect(inner).toBeTruthy();
    if (inner) {
      expect(inner.style.width).toBe('5%');
    }
  });
});
