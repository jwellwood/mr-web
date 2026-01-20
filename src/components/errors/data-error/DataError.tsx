import { ApolloError } from '@apollo/client';

import { SectionContainer } from '../../containers';
import { CustomTypography } from '../../typography';
import { ErrorText } from '..';

interface Props {
  error: ApolloError;
}

export default function DataError({ error }: Props) {
  const { networkError } = error;
  return (
    <SectionContainer title={<ErrorText>Something went wrong</ErrorText>}>
      <CustomTypography color="warning">
        {networkError ? 'Network error: ' : 'Server error: '}
        {error.message}
      </CustomTypography>
    </SectionContainer>
  );
}
