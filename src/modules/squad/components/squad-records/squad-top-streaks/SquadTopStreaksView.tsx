import { useTranslation } from 'react-i18next';
import { DataError, NoDataText } from '../../../../../components';
import { CustomTable } from '../../../../../components/tables';
import { TApolloError } from '../../../../../types/apollo';
import { T_FETCH_TOP_PLAYER_STREAKS_QUERY } from '../../../graphql';
import { columns, rows } from '../../tables/squad-top-streaks';

interface Props {
  data?: T_FETCH_TOP_PLAYER_STREAKS_QUERY;
  streakType: string;
  loading: boolean;
  error?: TApolloError;
}

export default function SquadTopStreaksView({ data, loading, error, streakType }: Props) {
  const { t } = useTranslation('squad');
  const renderContent = () => (
    <>
      {data && !data.streaks ? (
        <NoDataText>{t('NO_DATA.RECORDS')}</NoDataText>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows(streakType, data?.streaks)}
          isSortable={false}
          loading={loading}
          loadingRowCount={10}
        />
      )}
    </>
  );

  return error ? <DataError error={error} /> : renderContent();
}
