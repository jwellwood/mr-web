import { CustomButton, DataError, SectionContainer } from '../../../components';
import { AppIcon } from '../../../components/icons';
import { TApolloError } from '../../../types/apollo';
import OrgSearch from '../../home/forms/OrgSearch';
import TeamSearch from '../../home/forms/TeamSearch';

interface Props {
  error?: TApolloError;
  type: 'team' | 'organization';
  children: React.ReactNode;
}

export default function EntityListWrapper({ error, type, children }: Props) {
  const searchButton = (
    <CustomButton variant="text" color="primary">
      <AppIcon icon="search" />
    </CustomButton>
  );

  return (
    <SectionContainer
      title={type === 'organization' ? 'Organizations' : 'Teams'}
      secondaryAction={
        type === 'organization' ? (
          <OrgSearch buttonElement={searchButton} />
        ) : (
          <TeamSearch buttonElement={searchButton} />
        )
      }
    >
      <>
        {error && <DataError error={error} />}
        {children}
      </>
    </SectionContainer>
  );
}
