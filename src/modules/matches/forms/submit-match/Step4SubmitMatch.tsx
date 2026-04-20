import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FormContainer, NoDataText, SectionContainer } from '../../../../components';
import { getTempMatch, getTempPlayers } from '../../../../store';
import { TApolloError } from '../../../../types/apollo';
import MatchPlayersTable from '../components/MatchPlayersTable';

interface Props {
  onSubmit: () => void;
  loading: boolean;
  error?: TApolloError;
}

export default function Step4SubmitMatch({ onSubmit, loading, error }: Props) {
  const { t } = useTranslation('matches');
  const { handleSubmit } = useForm();
  const currentMatch = useSelector(getTempMatch);
  const currentPlayers = useSelector(getTempPlayers);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <SectionContainer title={t('SECTIONS.SUMMARY')}>
        {currentMatch.isForfeit ? (
          <NoDataText>{t('FORM.LABELS.FORFEITED_MATCH')}</NoDataText>
        ) : null}
        {currentPlayers.length ? <MatchPlayersTable currentPlayers={currentPlayers} /> : null}
      </SectionContainer>
    </FormContainer>
  );
}
