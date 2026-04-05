import { useTranslation } from 'react-i18next';
import { CustomButton, DataError, SectionContainer } from '../../../components';
import { AppIcon } from '../../../components/icons';
import { TApolloError } from '../../../types/apollo';
import OrgSearch from '../../home/containers/OrgSearch';
import TeamSearch from '../../home/containers/TeamSearch';

interface Props {
  error?: TApolloError;
  type: 'team' | 'organization';
  children: React.ReactNode;
}

export default function EntityListWrapper({ error, type, children }: Props) {
  const { t } = useTranslation('profile');

  const searchButton = (
    <CustomButton variant="text" color="primary">
      <AppIcon icon="search" />
    </CustomButton>
  );

  return (
    <SectionContainer
      title={type === 'organization' ? t('HEADERS.ORGANIZATIONS') : t('HEADERS.TEAMS')}
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
