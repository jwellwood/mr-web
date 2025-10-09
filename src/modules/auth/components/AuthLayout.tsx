import { ReactElement } from 'react';
import { SectionContainer } from '../../../components/containers';
import { theme } from '../../../theme';

type Props = {
  children: ReactElement;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div style={{ margin: '100px auto', textAlign: 'center', maxWidth: 300 }}>
      <SectionContainer background={theme.palette.secondary.dark}>{children}</SectionContainer>
    </div>
  );
}
