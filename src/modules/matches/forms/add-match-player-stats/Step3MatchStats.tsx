import { ApolloError } from '@apollo/client';
import { useSelector } from 'react-redux';
import { SubmitButton } from '../../../../components';
import { getTempMatch, getTempPlayers } from '../../../../store';
import { validateStats } from '../../helpers/statsValidation';
import AddMatchValidation from '../components/AddMatchValidation';
import MatchPlayersTable from '../components/match-players-table/MatchPlayersTable';

interface Props {
  onNextClick: () => void;
  error?: ApolloError;
}

export default function Step3MatchStats({ onNextClick, error }: Props) {
  const currentMatch = useSelector(getTempMatch);
  const currentPlayers = useSelector(getTempPlayers);
  const { isValid } = validateStats(currentMatch, currentPlayers);

  return (
    <>
      <AddMatchValidation players={currentPlayers} match={currentMatch} />
      <>
        <MatchPlayersTable currentPlayers={currentPlayers} error={error} />
        <SubmitButton onClick={onNextClick} disabled={!isValid}>
          Next
        </SubmitButton>
      </>
    </>
  );
}
