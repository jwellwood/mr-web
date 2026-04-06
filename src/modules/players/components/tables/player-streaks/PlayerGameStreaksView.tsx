import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../../components';
import { CustomTable } from '../../../../../components/tables';
import { TApolloError } from '../../../../../types/apollo';
import { T_FETCH_PLAYER_STREAKS } from '../../../graphql';
import { columns, rows } from './';

interface Props {
  data?: T_FETCH_PLAYER_STREAKS;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerGameStreaksView({ data, loading, error }: Props) {
  const { t } = useTranslation('players');
  const renderContent = () => {
    if (data?.streaks && !data.streaks.playedStreak.length) {
      return <NoDataText>{t('MESSAGES.NO_MATCHES_PLAYED_YET')}</NoDataText>;
    }
    return (
      <CustomTable
        columns={columns(t)}
        rows={rows(t, data?.streaks)}
        isSortable={false}
        loading={loading}
        loadingRowCount={4}
      />
    );
  };
  return (
    <SectionContainer title={t('SECTIONS.STREAKS')}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
