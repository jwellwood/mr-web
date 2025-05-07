import React, { type ReactElement } from 'react';
import ThemeWrapper from './ThemeWrapper';

interface Props {
  children: ReactElement;
}

const TestWrapper: React.FC<Props> = ({ children }: Props) => {
  return <ThemeWrapper>{children}</ThemeWrapper>;
};

export default TestWrapper;
