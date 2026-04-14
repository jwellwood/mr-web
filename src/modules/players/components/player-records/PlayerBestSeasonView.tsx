import { useTranslation } from 'react-i18next';
import { CustomTypography, DataError, NoDataText, SectionContainer } from '../../../../components';
import { PresentationModal } from '../../../../components/modals';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { useCustomParams } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../graphql';
import { ALL_SEASONS_TABLE } from '../tables/player-all-seasons';
import { BEST_SEASONS_TABLE } from '../tables/player-best-seasons';

interface Props {
  data?: T_FETCH_PLAYER_SEASONS_SUMMARY;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerBestSeasonView({ data, loading, error }: Props) {
  const { t } = useTranslation('players');
  const { teamId, orgId } = useCustomParams();
  const baseUrl = `/org/${orgId}/team/${teamId}`;
  const renderContent = () => {
    if (data && data.seasons.length === 0) {
      return <NoDataText>{t('NO_DATA.SEASON_RECORDS')}</NoDataText>;
    }
    return (
      <CustomTable
        columns={BEST_SEASONS_TABLE.columns}
        rows={BEST_SEASONS_TABLE.rows(t, data?.seasons)}
        isSortable={false}
        loading={loading}
        loadingRowCount={3}
      />
    );
  };

  const seasonModal = () => {
    const btn = (
      <CustomTypography bold color="primary" size="xs">
        {t('TABLES.BUTTONS.SEASONS')}
      </CustomTypography>
    );
    return (
      <PresentationModal buttonElement={btn} title={t('TABLES.BUTTONS.SEASONS')}>
        <CustomTable
          columns={ALL_SEASONS_TABLE.columns(t)}
          rows={ALL_SEASONS_TABLE.rows(baseUrl, data?.seasons) || []}
          loading={loading}
          isSortable
          loadingRowCount={10}
        />
      </PresentationModal>
    );
  };

  return (
    <SectionContainer title={t('SECTIONS.SINGLE_SEASON_RECORDS')} secondaryAction={seasonModal()}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
