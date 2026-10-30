import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import RequestOrgAdmin from '../../admin/containers/RequestOrgAdmin';
import RequestTeamAdmin from '../../admin/containers/RequestTeamAdmin';

interface Props {
  error?: TApolloError;
  type: 'team' | 'organization';
  children: React.ReactNode;
  loading: boolean;
}

export default function EntityListWrapper({ error, type, children, loading }: Props) {
  const { t } = useTranslation('profile');

  return (
    <SectionContainer
      title={type === 'organization' ? t('HEADERS.ORGANIZATIONS') : t('HEADERS.TEAMS')}
      secondaryAction={type === 'organization' ? <RequestOrgAdmin /> : <RequestTeamAdmin />}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {error && <DataError error={error} />}
          {children}
        </>
      )}
    </SectionContainer>
  );
}
