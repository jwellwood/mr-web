import React, { useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { SectionContainer } from '../../../components/containers';
import StatIcon from '../../../components/icons/StatIcon';
import LinksList from '../../../components/lists/LinksList';
import { Spinner } from '../../../components/loaders';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { GET_AWARDS_BY_PLAYER } from '../../history/graphql/getAwardsByPlayer.graphql.ts';
import { IListItem } from '../../../types';
import { GET_TROPHIES_BY_PLAYER } from '../graphql';
import { getTrophyListItem } from '../helpers/getTrophyListItem';
import { usePlayerData } from '../hooks/usePlayerData';
import { theme } from '../../../theme';

const PlayerHonors: React.FC = () => {
  const { playerId } = useCustomParams();
  const { data: playerData } = usePlayerData(playerId);
  const { seasonIds } = playerData || {};
  const { data, loading, error } = useQuery(GET_AWARDS_BY_PLAYER, {
    variables: { playerId },
  });

  const [
    getTrophiesByPlayer,
    { data: trophiesData, loading: trophiesLoading, error: trophiesError },
  ] = useLazyQuery(GET_TROPHIES_BY_PLAYER, {
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
          <SectionContainer background={theme.palette.dark.main}>
            <CustomTypography color="label" bold size="xs">
              Winner
            </CustomTypography>
            <LinksList links={trophies} />
          </SectionContainer>
        ) : (
          <Spinner />
        )}
        {!trophiesLoading && runnerUp ? (
          <SectionContainer background={theme.palette.dark.main}>
            <CustomTypography color="label" bold size="xs">
              Runner-up
            </CustomTypography>

            <LinksList links={runnerUp} />
          </SectionContainer>
        ) : (
          <Spinner />
        )}
      </SectionContainer>
      <SectionContainer title="Awards">
        <SectionContainer background={theme.palette.dark.main}>
          {!loading ? <LinksList links={awardsData} /> : <Spinner />}
        </SectionContainer>
      </SectionContainer>
    </>
  );
};

export default PlayerHonors;
