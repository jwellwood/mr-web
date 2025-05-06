import React, { ReactElement } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import ThemeWrapper from './ThemeWrapper';

interface Props {
  children: ReactElement;
  mock: any[];
}

const TestMockWrapper: React.FC<Props> = ({ children, mock }: Props) => {
  const mockIO = function () {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
  };

  (window.IntersectionObserver as any) = mockIO;

  return (
    <ThemeWrapper>
      <MockedProvider mocks={mock} addTypename={false}>
        {children}
      </MockedProvider>
    </ThemeWrapper>
  );
};

export default TestMockWrapper;
