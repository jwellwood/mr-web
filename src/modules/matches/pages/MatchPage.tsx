import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import { LINK_TYPE } from '../../../constants';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { TApolloError } from '../../../types/apollo';
import MatchView from '../components/match/MatchView';
import { T_FETCH_MATCH } from '../graphql';

interface Props {
  data?: T_FETCH_MATCH;
  loading: boolean;
  error?: TApolloError;
}

export default function MatchPage({ data, loading, error }: Props) {
  const { t } = useTranslation('matches');
  const { teamId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const adminLinks = isTeamAuth
    ? [{ label: t('LINKS.EDIT_MATCH'), type: LINK_TYPE.EDIT, link: 'edit' }]
    : undefined;

  return (
    <PageHeader title={t('PAGES.MATCH')} links={adminLinks}>
      <MatchView data={data} loading={loading} error={error} />
    </PageHeader>
  );
}
