import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('matches');
  const currentMatch = useSelector(getTempMatch);
  const currentPlayers = useSelector(getTempPlayers);
  const { isValid } = validateStats(currentMatch, currentPlayers);

  return (
    <>
      <AddMatchValidation players={currentPlayers} match={currentMatch} />
      <>
        {currentPlayers.length ? (
          <MatchPlayersTable currentPlayers={currentPlayers} error={error} />
        ) : null}
        <SubmitButton onClick={onNextClick} disabled={!isValid}>
          {t('FORM.BUTTONS.NEXT')}
        </SubmitButton>
      </>
    </>
  );
}
