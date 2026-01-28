import { useForm } from 'react-hook-form';
import { ApolloError } from '@apollo/client';

import { FormContainer, SectionContainer } from '../../../../components';
import TextList from '../../../../components/lists/TextList';
import { IListItem } from '../../../../components/lists/types';
import MatchPlayersTable from '../components/match-players-table/MatchPlayersTable';
import { getTempMatch, getTempPlayers } from '../../../../store';
import { useSelector } from 'react-redux';

interface Props {
  onSubmit: () => void;
  loading: boolean;
  error?: ApolloError;
}

export default function Step4SubmitMatch({ onSubmit, loading, error }: Props) {
  const { handleSubmit } = useForm();
  const currentMatch = useSelector(getTempMatch);
  const currentPlayers = useSelector(getTempPlayers);

  const data: IListItem[] = [
    {
      label: 'Forfeited Match',
      value: currentMatch.isForfeit ? 'Yes' : 'No',
    },
    { label: 'Players', value: String(currentPlayers.length) },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <SectionContainer title="Summary">
        <TextList data={data} />
        <MatchPlayersTable currentPlayers={currentPlayers} />
      </SectionContainer>
    </FormContainer>
  );
}
