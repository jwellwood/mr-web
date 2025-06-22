import React from 'react';
import { useQuery } from '@apollo/client';
import { HISTORY_ICONS } from '../../../app/icons';
import AppIcon from '../../../components/icons/AppIcon';
import LinksList from '../../../components/lists/LinksList';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { IListItem } from '../../../types';
import TrophiesTotals from '../components/TrophiesTotals';
import { GET_TROPHIES, GET_TROPHIES_TOTALS } from '../graphql/trophy';
import ErrorGraphql from '../../../errors/ErrorGraphql';

const Trophies: React.FC = () => {
  const { teamId } = useCustomParams();

  const { error, loading, data } = useQuery(GET_TROPHIES, {
    variables: { teamId },
  });

  const {
    error: totalsError,
    loading: totalsLoading,
    data: totalsData,
  } = useQuery(GET_TROPHIES_TOTALS, {
    variables: { teamId },
  });

  const trophies: IListItem[] = (data?.trophies || []).map(trophy => ({
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

  const totals = totalsError ? (
    <ErrorGraphql error={totalsError} />
  ) : (
    <TrophiesTotals data={totalsData?.trophyTotals} loading={totalsLoading} />
  );

  const list = error ? (
    <ErrorGraphql error={error} />
  ) : !loading ? (
    <LinksList links={trophies} />
  ) : (
    <CustomSkeleton />
  );

  return trophies?.length === 0 ? (
    <CustomTypography color="warning">No trophies yet</CustomTypography>
  ) : (
    <>
      {totals}
      {list}
    </>
  );
};

export default Trophies;
