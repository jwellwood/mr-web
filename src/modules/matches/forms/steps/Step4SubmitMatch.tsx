import { useForm } from 'react-hook-form';

import { FormContainer, SectionContainer } from '../../../../components';
import TextList from '../../../../components/lists/TextList';
import CustomTable from '../../../../components/tables/CustomTable';
import { match_form_table, match_form_table_styles } from '../../configs';
import { statsDataAll } from '../../helpers';
import { IPlayerInMatch, ITempMatch } from '../../types';
import { IListItem } from '../../../../components/lists/types';

interface Props {
  onSubmit: () => void;
  currentTempMatch: ITempMatch;
  currentTempPlayers: IPlayerInMatch[];
}

export default function Step4SubmitMatch({
  onSubmit,
  currentTempMatch,
  currentTempPlayers,
}: Props) {
  const { handleSubmit } = useForm();
  const tableData = statsDataAll(currentTempPlayers, false);
  const data: IListItem[] = [
    {
      label: 'Forfeited Match',
      value: currentTempMatch.isForfeit ? 'Yes' : 'No',
    },
    {
      label: 'League Position',
      value: String(currentTempMatch.leaguePosition) || '-',
    },
    { label: 'Cup Round', value: currentTempMatch.cupRound || '-' },
    { label: 'Players', value: String(currentTempPlayers.length) },
  ];
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} submitText="Submit">
      <SectionContainer title="Summary">
        <TextList data={data} />
        <CustomTable
          columns={match_form_table}
          rows={tableData}
          isSortable={false}
          cellIndexStyles={match_form_table_styles}
        />
      </SectionContainer>
    </FormContainer>
  );
}
