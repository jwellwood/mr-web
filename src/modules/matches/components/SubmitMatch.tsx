import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer, SectionContainer } from 'components/containers';
import TextList from 'components/lists/TextList';
import CustomTable from 'components/tables/CustomTable';
import { IListItem, IPlayerInMatch, ITempMatch } from 'types';
import { match_form_table, match_form_table_styles } from '../configs';
import { statsDataAll } from '../helpers';

type Props = {
  onSubmit: () => void;
  currentTempMatch: ITempMatch;
  currentTempPlayers: IPlayerInMatch[];
};

const SubmitMatch: React.FC<Props> = ({
  onSubmit,
  currentTempMatch,
  currentTempPlayers,
}) => {
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
    <FormContainer onSubmit={handleSubmit(onSubmit)} text="Submit">
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
};

export default SubmitMatch;
