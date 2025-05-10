import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES } from '../../../app/constants';
import { CustomButton } from '../../../components/buttons';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import RouteGuard from 'router/RouteGuard';
import { GET_MATCHES_BY_SEASON } from '../graphql';
import { getMatchListData } from '../helpers/getMatchListData.tsx';

const Matches: React.FC = () => {
  const { orgId, teamId } = useCustomParams();
  const { seasonId } = useSeasons();
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const LIMIT = 5;
  const { data, loading, error, fetchMore } = useQuery(GET_MATCHES_BY_SEASON, {
    variables: { limit: LIMIT, offset: 0, teamId, seasonId },
    skip: !seasonId,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setIsLoading(loading);
    if (data?.matches.length === LIMIT && isFirstLoad) {
      setShowLoadMore(true);
    }
  }, [data?.matches.length, isFirstLoad, loading]);

  const listData = useMemo(
    () =>
      getMatchListData({
        data: data?.matches,
        orgId,
        teamId,
        loading: isLoading,
        showBadge: true,
      }),
    [data?.matches, isLoading, orgId, teamId]
  );

  const loadMore = () => {
    setIsFirstLoad(false);
    fetchMore({
      variables: {
        offset: data?.matches.length,
      },
    }).then((res) => {
      if (res.data.matches.length < LIMIT) {
        setShowLoadMore(false);
      }
      setIsLoading(false);
    });
  };

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <SectionContainer>
        {data?.matches && data?.matches.length === 0 ? (
          <CustomTypography color="warning">No matches yet</CustomTypography>
        ) : (
          <>
            <LinksList links={listData} />
            {showLoadMore && (
              <CustomButton fullWidth variant="text" onClick={loadMore}>
                Load More
              </CustomButton>
            )}
          </>
        )}
      </SectionContainer>
    </RouteGuard>
  );
};

export default Matches;
