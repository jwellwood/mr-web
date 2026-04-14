import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FormContainer, SectionContainer } from '../../../../components';
import { TextList, type IListItem } from '../../../../components/lists';
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

  const data: IListItem[] = [
    {
      label: t('FORM.LABELS.FORFEITED_MATCH'),
      value: currentMatch.isForfeit ? t('MESSAGES.YES') : t('MESSAGES.NO'),
    },
    { label: t('FORM.LABELS.PLAYERS'), value: String(currentPlayers.length) },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <SectionContainer title={t('SECTIONS.SUMMARY')}>
        <TextList data={data} />
        <MatchPlayersTable currentPlayers={currentPlayers} />
      </SectionContainer>
    </FormContainer>
  );
}
