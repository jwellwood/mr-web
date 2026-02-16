import { useSelector } from 'react-redux';
import { SubmitButton } from '../../../../components';
import { getTempMatch, getTempPlayers } from '../../../../store';
import { TApolloError } from '../../../../types/apollo';
import { validateStats } from '../../helpers/statsValidation';
import AddMatchValidation from '../components/AddMatchValidation';
import MatchPlayersTable from '../components/MatchPlayersTable';

interface Props {
  onNextClick: () => void;
  error?: TApolloError;
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
