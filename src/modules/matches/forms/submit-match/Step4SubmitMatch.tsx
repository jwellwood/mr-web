import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FormContainer, SectionContainer } from '../../../../components';
import { TextList, type IListItem } from '../../../../components/lists';
import { getTempMatch, getTempPlayers } from '../../../../store';
import { TApolloError } from '../../../../types/apollo';
import MatchPlayersTable from '../components/match-players-table/MatchPlayersTable';

interface Props {
  onSubmit: () => void;
  loading: boolean;
  error?: TApolloError;
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
