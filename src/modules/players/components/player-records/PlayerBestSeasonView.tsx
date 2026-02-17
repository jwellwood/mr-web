import { CustomTypography, DataError, NoDataText, SectionContainer } from '../../../../components';
import { PresentationModal } from '../../../../components/modals';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { useCustomParams } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../types';
import { ALL_SEASONS_TABLE } from '../tables/player-all-seasons';
import { BEST_SEASONS_TABLE } from '../tables/player-best-seasons';

interface Props {
  data?: T_FETCH_PLAYER_SEASONS_SUMMARY;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerBestSeasonView({ data, loading, error }: Props) {
  const { teamId, orgId } = useCustomParams();
  const baseUrl = `/org/${orgId}/team/${teamId}`;
  const renderContent = () => {
    if (data && data.seasons.length === 0) {
      return <NoDataText>No season records</NoDataText>;
    }
    return (
      <CustomTable
        columns={BEST_SEASONS_TABLE.columns}
        rows={BEST_SEASONS_TABLE.rows(data?.seasons)}
        isSortable={false}
        loading={loading}
        loadingRowCount={3}
      />
    );
  };

  const seasonModal = () => {
    const btn = (
      <CustomTypography bold color="primary" size="xs">
        Seasons
      </CustomTypography>
    );
    return (
      <PresentationModal buttonElement={btn} title="Seasons">
        <CustomTable
          columns={ALL_SEASONS_TABLE.columns}
          rows={ALL_SEASONS_TABLE.rows(baseUrl, data?.seasons) || []}
          loading={loading}
          isSortable
          loadingRowCount={10}
        />
      </PresentationModal>
    );
  };

  return (
    <SectionContainer title="Single Season Records" secondaryAction={seasonModal()}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
