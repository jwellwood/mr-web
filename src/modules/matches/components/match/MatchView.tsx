import { lazy } from 'react';
import { ApolloError } from '@apollo/client';

import { POSITIONS, TAB_TYPES } from '../../../../constants';
import { CustomTabs, ITab } from '../../../../components/tabs';
import { NoDataText } from '../../../../components/typography';
import { DataError, SectionContainer } from '../../../../components';
import { T_FETCH_MATCH } from '../../types';
import CustomTable from '../../../../components/tables/CustomTable';
import { columns, rows, styles } from './config';

const MatchDetails = lazy(() => import('./MatchDetails'));
const HeadToHead = lazy(() => import('../../containers/HeadToHead'));

interface Props {
  data?: T_FETCH_MATCH;
  loading: boolean;
  error?: ApolloError;
}

export default function MatchView({ data, loading, error }: Props) {
  const opponentId = data?.match?.opponentId;
  const { matchPlayers = [] as T_FETCH_MATCH['match']['matchPlayers'] } = data?.match || {};
  const mappedPlayers = matchPlayers?.map(player => {
    return {
      ...player,
      name: player.playerId.name,
      position:
        POSITIONS[(player.matchPosition || player.playerId.position) as keyof typeof POSITIONS],
    };
  });

  const tabs: ITab[] = [
    {
      label: 'Players',
      component: data?.match?.isForfeit ? (
        <NoDataText>This match was forfeited</NoDataText>
      ) : (
        <SectionContainer>
          <CustomTable
            columns={columns}
            rows={rows(mappedPlayers, loading)}
            isSortable
            sortByString="position"
            cellIndexStyles={styles}
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
