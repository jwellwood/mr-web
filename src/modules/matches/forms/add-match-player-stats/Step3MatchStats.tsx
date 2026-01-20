import { useSelector } from 'react-redux';
import { ApolloError } from '@apollo/client';

import { validateStats } from '../../helpers/statsValidation';
import AddMatchValidation from '../components/AddMatchValidation';
import { getTempMatch } from '../../../../store';
import { IPlayerInMatch } from '../../types';
import { SubmitButton } from '../../../../components';
import MatchPlayersTable from '../components/match-players-table/MatchPlayersTable';

interface Props {
  onNextClick: () => void;
  currentPlayers: IPlayerInMatch[];
  error?: ApolloError;
}

export default function Step3MatchStats({ onNextClick, currentPlayers, error }: Props) {
  const currentMatch = useSelector(getTempMatch);
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
