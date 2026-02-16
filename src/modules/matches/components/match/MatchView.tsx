import { lazy } from 'react';
import { DataError, SectionContainer } from '../../../../components';
import { CustomTable } from '../../../../components/tables';
import { CustomTabs, ITab } from '../../../../components/tabs';
import { NoDataText } from '../../../../components/typography';
import { POSITIONS, TAB_TYPES } from '../../../../constants';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCH } from '../../types';
import { columns, rows } from '../tables/match-players';

const MatchDetails = lazy(() => import('./MatchDetails'));
const HeadToHead = lazy(() => import('../../containers/HeadToHead'));

interface Props {
  data?: T_FETCH_MATCH;
  loading: boolean;
  error?: TApolloError;
}

export default function MatchView({ data, loading, error }: Props) {
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
      label: 'Players',
      component: data?.match?.isForfeit ? (
        <NoDataText>This match was forfeited</NoDataText>
      ) : (
        <SectionContainer>
          <CustomTable
            columns={columns}
            rows={rows(mappedPlayers)}
            isSortable
            sortByString="position"
            loading={loading}
            loadingRowCount={20}
          />
        </SectionContainer>
      ),
    },
    {
      label: 'Head to Head',
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
