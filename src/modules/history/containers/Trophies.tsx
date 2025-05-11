import React from 'react';
import { useQuery } from '@apollo/client';
import { HISTORY_ICONS } from '../../../app/icons';
import SectionContainer from '../../../components/containers/SectionContainer';
import AppIcon from '../../../components/icons/AppIcon';
import LinksList from '../../../components/lists/LinksList';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { IListItem } from '../../../types';
import TrophiesTotals from '../components/TrophiesTotals';
import { GET_TROPHIES } from '../graphql/getTrophies.graphql';
import { GET_TROPHIES_TOTALS } from '../graphql/getTrophiesTotals.graphql';

const Trophies: React.FC = () => {
  const { teamId } = useCustomParams();

  const { loading, data } = useQuery(GET_TROPHIES, {
    variables: { teamId },
  });

  const { loading: totalsLoading, data: totals } = useQuery(
    GET_TROPHIES_TOTALS,
    {
      variables: { teamId },
    }
  );

  const trophies: IListItem[] = (data?.trophies || []).map((trophy) => ({
    icon: (
      <AppIcon
        size="1.5rem"
        color={trophy.isWinner ? 'gold' : 'silver'}
        icon={trophy.isWinner ? HISTORY_ICONS.WINNER : HISTORY_ICONS.RUNNER_UP}
      />
    ),
    link: `trophy/${trophy._id}`,
    label: (
      <CustomTypography color="label" bold size="xs">
        {trophy.season}
      </CustomTypography>
    ),
    value: trophy.name,
  }));

  return trophies?.length === 0 ? (
    <CustomTypography color="warning">No trophies yet</CustomTypography>
  ) : (
    <>
      <TrophiesTotals data={totals?.trophyTotals} loading={totalsLoading} />
      <SectionContainer>
        {!loading ? <LinksList links={trophies} /> : <CustomSkeleton />}
      </SectionContainer>
    </>
  );
};

export default Trophies;
