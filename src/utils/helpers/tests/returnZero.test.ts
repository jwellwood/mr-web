import React from 'react';
import { render } from '@testing-library/react';
import { returnStatAsZero } from '../returnZero';

describe('return stat as zero tests', () => {
  test('number is returned when stat is number', () => {
    const result = returnStatAsZero(2);
    expect(result).toBe(2);
  });
  test('Stat skeleton is rendered when type is not number', () => {
    const result = returnStatAsZero(undefined);
    if (React.isValidElement(result)) {
      //Needed as return type can be number or React Component
      const { container } = render(result);
      const statSkeleton = container.querySelector('span');
      expect(statSkeleton).toHaveStyle('width: 24px');
      expect(statSkeleton).toHaveStyle('height: 20px');
    } else {
      throw new Error('Expected a React component but got a number');
    }
  });
});
