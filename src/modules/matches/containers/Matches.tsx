import { useEffect, useState } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';

import { FETCH_MATCHES } from '../graphql';

import { AUTH_ROLES } from '../../../constants';
import { CustomButton } from '../../../components/buttons';
import { SectionContainer } from '../../../components';
import LinksList from '../../../components/lists/links-list/LinksList.tsx';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import RouteGuard from '../../../router/RouteGuard';
import { getMatchListData } from '../helpers/getMatchListData.tsx';
import Spinner from '../../../components/loaders/Spinner.tsx';

export default function Matches() {
  const { orgId, teamId } = useCustomParams();
  const { seasonId } = useSeasons();
  const [showLoadAll, setShowLoadAll] = useState(false);

  const LIMIT = 5;
  const { data, error, fetchMore, networkStatus } = useQuery(FETCH_MATCHES, {
    variables: { limit: LIMIT, offset: 0, teamId, seasonId },
    skip: !seasonId,
    notifyOnNetworkStatusChange: true,
  });

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;

  useEffect(() => {
    const x = data?.matches?.length && data?.matches?.length <= LIMIT;
    setShowLoadAll(x as boolean);
  }, [data?.matches?.length]);

  const listData = getMatchListData({
    data: data?.matches,
    orgId,
    teamId,
    // loading: loading,
    showBadge: true,
  });

  const loadAll = async () => {
    await fetchMore({
      variables: { limit: LIMIT * 100, offset: data?.matches.length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return {
          matches: [...previousResult.matches, ...fetchMoreResult.matches],
        };
      },
    });
    setShowLoadAll(false);
  };

  const renderContent = () => {
    return data?.matches && data?.matches.length === 0 ? (
      <CustomTypography color="warning">No matches yet</CustomTypography>
    ) : (
      <>
        <LinksList links={listData} />
        {isLoadingMore && <Spinner isSecondary />}
        {showLoadAll && (
          <CustomButton fullWidth variant="text" onClick={loadAll}>
            Load All
          </CustomButton>
        )}
      </>
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <SectionContainer>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </SectionContainer>
    </RouteGuard>
  );
}
