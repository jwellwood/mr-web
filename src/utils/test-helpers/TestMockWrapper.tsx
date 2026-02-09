import { MockedProvider } from '@apollo/client/testing';
import React, { ReactElement } from 'react';
import ThemeWrapper from './ThemeWrapper';

interface Props {
  children: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mock: any[];
}

const TestMockWrapper: React.FC<Props> = ({ children, mock }: Props) => {
  return (
    <ThemeWrapper>
      <MockedProvider mocks={mock} addTypename={false}>
        {children}
      </MockedProvider>
    </ThemeWrapper>
  );
};

export default TestMockWrapper;
