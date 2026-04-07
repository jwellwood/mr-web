import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import { useAuth, useCustomParams } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import SeasonAdminView from '../components/SeasonAdminView';
import { T_FETCH_ORG_SEASON } from '../graphql';
import { getSeasonAdminLinks } from '../helpers/getSeasonAdminLinks';

interface Props {
  data?: T_FETCH_ORG_SEASON;
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonAdminPage({ data, loading, error }: Props) {
  const { t } = useTranslation('seasons');
  const { orgId, orgSeasonId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);

  return (
    <PageContainer
      title={`${data?.orgSeason.name || ''} ${t('PAGES.SEASON_ADMIN')}`}
      links={isOrgAuth ? getSeasonAdminLinks(t, orgId, orgSeasonId) : undefined}
    >
      <SeasonAdminView season={data?.orgSeason} loading={loading} error={error} />
    </PageContainer>
  );
}
