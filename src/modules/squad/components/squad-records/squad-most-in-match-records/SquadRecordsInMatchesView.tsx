import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../../components';
import { TApolloError } from '../../../../../types/apollo';
import {
  T_FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY,
  T_FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY,
} from '../../../graphql';
import MostInMatch from './MostInMatch';

interface Props {
  data?: T_FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY | T_FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY;
  title: string;
  loading: boolean;
  error?: TApolloError;
}

export default function SquadRecordsInMatchesView({ data, loading, error, title }: Props) {
  const { t } = useTranslation('squad');
  const renderData =
    data?.stats.length === 0 ? (
      <NoDataText>{t('NO_DATA.RECORDS_IN_MATCHES')}</NoDataText>
    ) : (
      <MostInMatch data={data?.stats} loading={loading} />
    );

  return (
    <SectionContainer title={t('SECTION_TITLES.MOST_IN_MATCH', { stat: title })}>
      {error ? <DataError error={error} /> : renderData}
    </SectionContainer>
  );
}
