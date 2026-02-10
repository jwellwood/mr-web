import { ErrorText } from '..';
import { TApolloError } from '../../../types/apollo';
import { SectionContainer } from '../../containers';
import { CustomTypography } from '../../typography';

interface Props {
  error: TApolloError;
}

export default function DataError({ error }: Props) {
  return (
    <SectionContainer title={<ErrorText>Something went wrong</ErrorText>}>
      <CustomTypography color="warning">{error.message}</CustomTypography>
    </SectionContainer>
  );
}
