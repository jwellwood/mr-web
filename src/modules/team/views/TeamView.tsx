import { ApolloError } from '@apollo/client';

import { IMAGE_TYPE } from '../../../constants';
import ModuleHeader from '../../../components/shared/module-header/ModuleHeader';
import { DataError } from '../../../components';
import { ITeamResponse } from '../types';
import Organization from '../components/Organization';
import Kits from '../components/Kits';
import Stadium from '../components/Stadium';

interface Props {
  data?: { team: ITeamResponse };
  loading: boolean;
  error?: ApolloError;
}

export default function TeamView({ data, loading, error }: Props) {
  const { teamName, teamBadge, location, country } = data?.team || {};

  return (
    <>
      {error ? (
        <DataError error={error} />
      ) : (
        <>
          <ModuleHeader
            title={teamName}
            badge={teamBadge?.url}
            city={location}
            country={country}
            type={IMAGE_TYPE.TEAM}
            loading={loading}
          />
          <Organization team={data?.team} loading={loading} />
          <Kits team={data?.team} loading={loading} />
          <Stadium team={data?.team} loading={loading} />
        </>
      )}
    </>
  );
}
