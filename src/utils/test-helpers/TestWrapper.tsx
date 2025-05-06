import React, { ReactElement } from 'react';
import ThemeWrapper from './ThemeWrapper';

interface Props {
  children: ReactElement;
}

const TestWrapper: React.FC<Props> = ({ children }: Props) => {
  const mockIO = function () {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
  };

  (window.IntersectionObserver as any) = mockIO;

  return <ThemeWrapper>{children}</ThemeWrapper>;
};

export default TestWrapper;
