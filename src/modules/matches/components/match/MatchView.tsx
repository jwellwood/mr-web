import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer } from '../../../../components';
import { CustomTable } from '../../../../components/tables';
import { CustomTabs, ITab } from '../../../../components/tabs';
import { NoDataText } from '../../../../components/typography';
import { POSITIONS, TAB_TYPES } from '../../../../constants';
import { useCustomParams } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCH } from '../../graphql';
import { MATCH_PLAYER_TABLE } from '../tables/match-players';

const MatchDetails = lazy(() => import('./MatchDetails'));
const HeadToHead = lazy(() => import('../../containers/HeadToHead'));

interface Props {
  data?: T_FETCH_MATCH;
  loading: boolean;
  error?: TApolloError;
}

export default function MatchView({ data, loading, error }: Props) {
  const { t } = useTranslation('matches');
  const { teamId, orgId } = useCustomParams();
  const baseUrl = `/org/${orgId}/team/${teamId}`;
  const opponentId = data?.match?.opponentId;
  const { matchPlayers = [] as T_FETCH_MATCH['match']['matchPlayers'] } = data?.match || {};
  const mappedPlayers = matchPlayers
    ?.map(player => {
      return {
        ...player,
        name: player.playerId.name,
        position:
          POSITIONS[(player.matchPosition || player.playerId.position) as keyof typeof POSITIONS],
      };
    })
    .sort((a, b) => (a.position || '').localeCompare(b.position || ''));

  const tabs: ITab[] = [
    {
      label: t('TABS.PLAYERS'),
      component: data?.match?.isForfeit ? (
        <NoDataText>{t('MESSAGES.MATCH_FORFEITED')}</NoDataText>
      ) : (
        <SectionContainer>
          <CustomTable
            columns={MATCH_PLAYER_TABLE.columns(t)}
            rows={MATCH_PLAYER_TABLE.rows(mappedPlayers, baseUrl)}
            isSortable
            sortByString="position"
            loading={loading}
            loadingRowCount={20}
          />
        </SectionContainer>
      ),
    },
    {
      label: t('TABS.HEAD_TO_HEAD'),
      component: <HeadToHead opponentId={opponentId?._id} />,
    },
  ];

  const renderContent = () => {
    return (
      <>
        <MatchDetails match={data?.match} loading={loading} />
        <CustomTabs type={TAB_TYPES.MATCH} tabs={tabs} level="secondary" />
      </>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
