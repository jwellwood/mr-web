import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import DifferenceText from '../DifferenceText';

describe('DifferenceText', () => {
  it('renders positive stat with "+" prefix', () => {
    const { container } = render(
      <TestWrapper>
        <DifferenceText stat={5} />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('+5');
  });

  it('renders negative stat without "+" prefix', () => {
    const { container } = render(
      <TestWrapper>
        <DifferenceText stat={-3} />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('-3');
    expect(container).not.toHaveTextContent('+-3');
  });

  it('renders zero without a "+" prefix', () => {
    const { container } = render(
      <TestWrapper>
        <DifferenceText stat={0} />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('0');
    expect(container).not.toHaveTextContent('+0');
  });
});
