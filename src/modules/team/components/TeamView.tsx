import { ApolloError } from '@apollo/client';
import { DataError } from '../../../components';
import ModuleHeader from '../../../components/shared/module-header/ModuleHeader';
import { IMAGE_TYPE } from '../../../constants';
import Kits from '../components/Kits';
import Organization from '../components/Organization';
import Stadium from '../components/Stadium';
import { FETCH_TEAM_QUERY } from '../types';

interface Props {
  data?: FETCH_TEAM_QUERY;
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
            type={IMAGE_TYPE.BADGE}
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
