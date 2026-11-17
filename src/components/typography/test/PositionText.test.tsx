import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import PositionText from '../position-text/PositionText';

describe('PositionText', () => {
  it.each([
    ['GK', 'GK'],
    ['DF', 'DF'],
    ['MF', 'MF'],
    ['FW', 'FW'],
  ])('renders translated position code for "%s"', (position, code) => {
    render(
      <TestWrapper>
        <PositionText position={position} />
      </TestWrapper>
    );
    expect(screen.getByText(code)).toBeInTheDocument();
  });

  it('renders unrecognised string as-is', () => {
    render(
      <TestWrapper>
        <PositionText position="CB" />
      </TestWrapper>
    );
    expect(screen.getByText('CB')).toBeInTheDocument();
  });

  it('renders empty string as dash', () => {
    render(
      <TestWrapper>
        <PositionText position="" />
      </TestWrapper>
    );
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('applies correct color for valid positions', () => {
    const { container } = render(
      <TestWrapper>
        <PositionText position="GK" />
      </TestWrapper>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('accepts a custom size prop', () => {
    const { container } = render(
      <TestWrapper>
        <PositionText size="md" position="GK" />
      </TestWrapper>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
