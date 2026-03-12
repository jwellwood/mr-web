import { ReactElement } from 'react';
import { AppTitleText, CustomTypography, SectionContainer } from '../../../components';

interface Props {
  children: ReactElement;
  helpText?: string;
}

export default function AuthLayout({ children, helpText }: Props) {
  return (
    <div style={{ margin: '100px auto', textAlign: 'center', maxWidth: 300 }}>
      <AppTitleText>Footy Stats</AppTitleText>
      {helpText ? (
        <SectionContainer>
          <CustomTypography color="data">{helpText}</CustomTypography>
        </SectionContainer>
      ) : null}
      <SectionContainer>{children}</SectionContainer>
    </div>
  );
}
