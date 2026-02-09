/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { expect, describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
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
