import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import NumberText from '../NumberText';

describe('NumberText', () => {
  it('renders the numeric value', () => {
    const { container } = render(
      <TestWrapper>
        <NumberText value={42} />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('42');
  });

  it('appends "%" when isPercentage is true', () => {
    const { container } = render(
      <TestWrapper>
        <NumberText value={75} isPercentage />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('75');
    expect(container).toHaveTextContent('%');
  });

  it('does not append "%" when isPercentage is false', () => {
    const { container } = render(
      <TestWrapper>
        <NumberText value={10} />
      </TestWrapper>
    );
    expect(container).not.toHaveTextContent('%');
  });

  it('renders 0 when value is NaN', () => {
    const { container } = render(
      <TestWrapper>
        <NumberText value={NaN} />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('0');
  });

  it('renders decimal values', () => {
    const { container } = render(
      <TestWrapper>
        <NumberText value={3.14} />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('3.14');
  });
});
