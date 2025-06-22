import React from 'react';
import { useQuery } from '@apollo/client';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { useCustomParams } from '../../../hooks/useCustomParams';
import TrophiesTotals from '../components/TrophiesTotals';
import { GET_TROPHIES, GET_TROPHIES_TOTALS } from '../graphql/trophy';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import TrophiesOrderBy from '../components/TrophiesOrderBy';

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

  const totals = totalsError ? (
    <ErrorGraphql error={totalsError} />
  ) : (
    <TrophiesTotals data={totalsData?.trophyTotals} loading={totalsLoading} />
  );

  const list = error ? (
    <ErrorGraphql error={error} />
  ) : !loading ? (
    <TrophiesOrderBy trophies={data?.trophies || []} />
  ) : (
    <CustomSkeleton />
  );

  return !loading && data?.trophies?.length === 0 ? (
    <CustomTypography color="warning">No trophies yet</CustomTypography>
  ) : (
    <>
      {totals}
      {list}
    </>
  );
};

export default Trophies;
