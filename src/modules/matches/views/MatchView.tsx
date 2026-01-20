import { lazy } from 'react';
import { ApolloError } from '@apollo/client';

import { TAB_TYPES } from '../../../constants';
import { CustomTabs, ITab } from '../../../components/tabs';
import { NoDataText } from '../../../components/typography';
import { ITeam } from '../../team/types';
import { DataError } from '../../../components';
import { IMatchResponse } from '../types';

const MatchDetails = lazy(() => import('../components/MatchDetails'));
const MatchPlayersTable = lazy(() => import('../components/match-players-table/MatchPlayersTable'));
const HeadToHead = lazy(() => import('../containers/HeadToHead'));

interface Props {
  data?: { match: IMatchResponse };
  loading: boolean;
  error?: ApolloError;
}

export default function MatchView({ data, loading, error }: Props) {
  const opponentId = (data?.match?.opponentId as unknown as ITeam)?._id;
  const tabs: ITab[] = [
    {
      label: 'Players',
      component: data?.match?.isForfeit ? (
        <NoDataText>This match was forfeited</NoDataText>
      ) : (
        <MatchPlayersTable match={data?.match} loading={loading} />
      ),
    },
    {
      label: 'Head to Head',
      component: <HeadToHead opponentId={opponentId} />,
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
