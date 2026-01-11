import { ApolloError } from '@apollo/client';

import { DataError, LinksList, NoDataText, SectionContainer } from '../../../components';
import { IMatchList } from '../types.ts';
import { getMatchListData } from '../helpers';
import { useCustomParams } from '../../../hooks';

interface Props {
  data?: { matches: IMatchList[] };
  loading: boolean;
  error?: ApolloError;
  seasonReady: boolean;
}

export default function MatchesView({ data, loading, error, seasonReady }: Props) {
  const { orgId, teamId } = useCustomParams();

  const listData = getMatchListData({
    data: data?.matches,
    orgId,
    teamId,
    showBadge: true,
  });

  const renderContent = () => {
    return (
      <SectionContainer>
        {(seasonReady && !data && !loading) || (data?.matches && data?.matches.length === 0) ? (
          <NoDataText>No matches yet</NoDataText>
        ) : (
          <LinksList links={listData} loading={loading} rows={15} />
        )}
      </SectionContainer>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
