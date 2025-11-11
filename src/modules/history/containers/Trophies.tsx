import { useQuery } from '@apollo/client';

import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { useCustomParams } from '../../../hooks/useCustomParams';
import TrophiesTotals from '../components/TrophiesTotals';
import { FETCH_TROPHIES, FETCH_TROPHIES_TOTALS } from '../graphql';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import TrophiesOrderBy from '../components/TrophiesOrderBy';

export default function Trophies() {
  const { teamId } = useCustomParams();

  const { error, loading, data } = useQuery(FETCH_TROPHIES, {
    variables: { teamId },
  });

  const {
    error: totalsError,
    loading: totalsLoading,
    data: totalsData,
  } = useQuery(FETCH_TROPHIES_TOTALS, {
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
}
