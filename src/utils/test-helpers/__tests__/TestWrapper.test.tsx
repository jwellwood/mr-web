/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import TestWrapper from '../TestWrapper';

describe('TestWrapper', () => {
  it('renders children correctly', () => {
    // Arrange
    const testId = 'test-child';
    const testText = 'Test Child';

    // Act
    const screen = render(
      <TestWrapper>
        <div data-testid={testId}>{testText}</div>
      </TestWrapper>
    );

    // Assert
    const childElement = screen.getByTestId(testId);
    (expect(childElement) as any).toBeInTheDocument();
    (expect(childElement) as any).toHaveTextContent(testText);
  });
});
