import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import TeamAdminView from '../components/TeamAdminView';
import type { T_FETCH_TEAM_ADMIN_VIEW } from '../graphql';

interface Props {
  data: T_FETCH_TEAM_ADMIN_VIEW | undefined;
  loading: boolean;
  error?: TApolloError;
}

export default function AdminTeamPage({ data, loading, error }: Props) {
  const { t } = useTranslation('admin');

  const renderContent = () => {
    return !loading ? <TeamAdminView team={data?.team} /> : <Spinner />;
  };

  return (
    <PageHeader title={t('PAGES.TEAM_ADMIN')}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
