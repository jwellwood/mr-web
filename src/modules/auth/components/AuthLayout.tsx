import { ReactElement } from 'react';
import { SectionContainer } from '../../../components';

type Props = {
  children: ReactElement;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div style={{ margin: '100px auto', textAlign: 'center', maxWidth: 300 }}>
      <SectionContainer>{children}</SectionContainer>
    </div>
  );
}
