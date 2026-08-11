import { useTranslation } from 'react-i18next';
import { CustomTypography, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { ITempMatchPlayers } from '../../types';
import { rows } from './match-form';
import { columns } from './match-form';

interface Props {
  currentPlayers: ITempMatchPlayers[];
  showHelperText?: boolean;
  error?: TApolloError;
}

export default function MatchPlayersTable({ currentPlayers, showHelperText = true, error }: Props) {
  const { t } = useTranslation('matches');
  return (
    <SectionContainer>
      {showHelperText && (
        <SectionContainer type="admin">
          <CustomTypography color="data">{t('FORM.SUMMARY')}</CustomTypography>
        </SectionContainer>
      )}
      <CustomTable
        rows={rows(currentPlayers, error)}
        columns={columns}
        isSortable={false}
        loading={false}
        loadingRowCount={0}
      />
    </SectionContainer>
  );
}
