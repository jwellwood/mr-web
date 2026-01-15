import { ApolloError } from '@apollo/client';

import { ILeaguePositions } from '../types';
import { DataError, NoDataText, SectionContainer } from '../../../components';
import SeasonsTable from '../components/seasons-table/SeasonsTable';

type Props = {
  data?: { position: ILeaguePositions[] };
  loading: boolean;
  error?: ApolloError;
};

export default function SeasonsView({ data, loading, error }: Props) {
  const renderContent = () => {
    return data?.position && data?.position.length === 0 ? (
      <NoDataText>No seasons yet</NoDataText>
    ) : (
      <SeasonsTable data={data?.position} loading={loading} />
    );
  };
  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
