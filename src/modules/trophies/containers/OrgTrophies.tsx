import { useQuery } from '@apollo/client/react';
import OrgTrophiesList from '../components/OrgTrophiesList';
import { FETCH_ORG_TROPHIES } from '../graphql';

interface Props {
  orgSeasonId: string;
  isAdminView: boolean;
}

export default function OrgTrophies({ orgSeasonId, isAdminView }: Props) {
  const { data, error, loading } = useQuery(FETCH_ORG_TROPHIES, {
    variables: { orgSeasonId },
  });

  return (
    <OrgTrophiesList
      orgSeasonId={orgSeasonId}
      orgTrophies={data?.trophies ?? []}
      error={error}
      loading={loading}
      isAdminView={isAdminView}
    />
  );
}
