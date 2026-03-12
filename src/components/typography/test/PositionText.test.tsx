import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import PositionText from '../position-text/PositionText';

describe('PositionText', () => {
  it.each([['GK'], ['DF'], ['MF'], ['FW']])('renders position string "%s"', position => {
    render(
      <TestWrapper>
        <PositionText>{position}</PositionText>
      </TestWrapper>
    );
    expect(screen.getByText(position)).toBeInTheDocument();
  });

  it.each([[1], [2], [3], [4]])('renders position number %i', num => {
    render(
      <TestWrapper>
        <PositionText>{num}</PositionText>
      </TestWrapper>
    );
    expect(screen.getByText(String(num))).toBeInTheDocument();
  });

  it('renders unrecognised string as-is', () => {
    render(
      <TestWrapper>
        <PositionText>CB</PositionText>
      </TestWrapper>
    );
    expect(screen.getByText('CB')).toBeInTheDocument();
  });

  it('accepts a custom size prop', () => {
    const { container } = render(
      <TestWrapper>
        <PositionText size="md">GK</PositionText>
      </TestWrapper>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
