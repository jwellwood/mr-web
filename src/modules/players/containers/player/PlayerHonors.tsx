import React, { useEffect } from 'react';
import { FETCH_AWARDS_BY_PLAYER } from '../../../history/graphql';
import { useLazyQuery, useQuery } from '@apollo/client';
import { SectionContainer } from '../../../../components';
import StatIcon from '../../../../components/icons/StatIcon';
import LinksList from '../../../../components/lists/LinksList';
import { Spinner } from '../../../../components/loaders';
import { CustomTypography } from '../../../../components/typography';
import ErrorGraphql from '../../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { FETCH_PLAYER_TROPHIES } from '../../graphql';
import { getTrophyListItem } from '../../helpers';
import { usePlayerData } from '../../hooks/usePlayerData';
import { IListItem } from '../../../../components/lists/types';

const PlayerHonors: React.FC = () => {
  const { playerId } = useCustomParams();
  const { data: playerData } = usePlayerData(playerId);
  const { seasonIds } = playerData || {};
  const { data, loading, error } = useQuery(FETCH_AWARDS_BY_PLAYER, {
    variables: { playerId },
  });

  const [
    getTrophiesByPlayer,
    { data: trophiesData, loading: trophiesLoading, error: trophiesError },
  ] = useLazyQuery(FETCH_PLAYER_TROPHIES, {
    variables: { seasonIds: seasonIds?.map(season => season._id) },
  });

  const awardsData: IListItem[] =
    data?.awards.map(award => {
      return {
        icon: <StatIcon icon="mvp" />,
        label: (
          <CustomTypography color="data" bold size="xs">
            {award.awardName}
          </CustomTypography>
        ),
        value: (
          <CustomTypography color="data" bold size="xs">
            {award.season}
          </CustomTypography>
        ),
      };
    }) || [];

  useEffect(() => {
    if ((seasonIds?.length || 0) > 0) {
      getTrophiesByPlayer();
    }
  }, [getTrophiesByPlayer, seasonIds]);

  const trophies: IListItem[] = (trophiesData?.trophies || [])
    .filter(trophy => trophy.isWinner)
    .map(trophy => getTrophyListItem(trophy));
  const runnerUp: IListItem[] = (trophiesData?.trophies || [])
    .filter(trophy => !trophy.isWinner)
    .map(trophy => getTrophyListItem(trophy));

  if (error || trophiesError) return <ErrorGraphql error={(error || trophiesError) as Error} />;

  return (
    <>
      <SectionContainer title="Trophies">
        {!trophiesLoading && trophies ? (
          <SectionContainer subtitle="Winner">
            <LinksList links={trophies} />
          </SectionContainer>
        ) : (
          <Spinner />
        )}
        {!trophiesLoading && runnerUp ? (
          <SectionContainer subtitle="Runner-up">
            <LinksList links={runnerUp} />
          </SectionContainer>
        ) : (
          <Spinner />
        )}
      </SectionContainer>
      <SectionContainer title="Awards">
        <SectionContainer>
          {!loading ? <LinksList links={awardsData} /> : <Spinner />}
        </SectionContainer>
      </SectionContainer>
    </>
  );
};

export default PlayerHonors;
