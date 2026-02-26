import { DataError, SectionContainer } from '../../../../components';
import { LinksList } from '../../../../components/lists';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';

interface Props {
  teams: {
    _id: string;
    teamName: string;
  }[];
  loading: boolean;
  error?: TApolloError;
}

export default function TeamsAdmin({ teams, loading, error }: Props) {
  const { orgId } = useCustomParams();
  return (
    <SectionContainer title="Teams">
      {error ? <DataError error={error} /> : null}
      {loading ? (
        <Spinner />
      ) : (
        <LinksList
          links={
            teams.map(team => ({
              label: team.teamName,
              link: `/org/${orgId}/team/${team._id}`,
            })) || []
          }
        />
      )}
    </SectionContainer>
  );
}
