import { useForm } from 'react-hook-form';
import { ApolloError } from '@apollo/client';

import { FormContainer, SectionContainer } from '../../../../components';
import TextList from '../../../../components/lists/TextList';
import { IPlayerInMatch, ITempMatch } from '../../types';
import { IListItem } from '../../../../components/lists/types';
import MatchPlayersTable from '../components/match-players-table/MatchPlayersTable';

interface Props {
  onSubmit: () => void;
  currentTempMatch: ITempMatch;
  currentTempPlayers: IPlayerInMatch[];
  loading: boolean;
  error?: ApolloError;
}

export default function Step4SubmitMatch({
  onSubmit,
  currentTempMatch,
  currentTempPlayers,
  loading,
  error,
}: Props) {
  const { handleSubmit } = useForm();

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
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <SectionContainer title="Summary">
        <TextList data={data} />
        <MatchPlayersTable currentPlayers={currentTempPlayers} />
      </SectionContainer>
    </FormContainer>
  );
}
