import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton, CustomTypography, SectionContainer } from '../../../components';
import { APP_ICONS, AppIcon } from '../../../components/icons';
import { TextList } from '../../../components/lists';
import ConfirmationModal from '../../../components/modals/confirmation-modal/ConfirmationModal';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { BATCH_CONFIRM_RESULTS, FETCH_RESULTS, T_FETCH_RESULTS } from '../graphql';

interface Props {
  results: T_FETCH_RESULTS['results'];
}

export default function BatchConfirmResults({ results }: Props) {
  const { orgId, orgSeasonId } = useCustomParams();
  const competitionId = results[0].competitionId._id;
  const { t } = useTranslation('results');
  const dispatch: AppDispatch = useDispatch();
  const [confirmResult, { loading }] = useMutation(BATCH_CONFIRM_RESULTS, {
    refetchQueries: [{ query: FETCH_RESULTS, variables: { orgId, orgSeasonId, competitionId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.CONFIRM_RESULTS.ERROR'), type: 'error' })),
  });

  const onConfirm = () => {
    confirmResult({
      variables: { orgId: orgId!, resultIds: results.map(r => r._id) },
    })
      .then(() => {
        dispatch(showAlert({ text: t('ALERTS.CONFIRM_RESULTS.SUCCESS'), type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.CONFIRM_RESULTS.ERROR'), type: 'error' }));
      });
  };

  const listItems = (result: T_FETCH_RESULTS['results'][0]) => [
    {
      label: (
        <CustomTypography color="data" bold>
          {result.homeTeam?.teamName || '-'}
        </CustomTypography>
      ),
      value: result.homeGoals ?? '-',
    },
    {
      label: (
        <CustomTypography color="data" bold>
          {result.awayTeam?.teamName || '-'}
        </CustomTypography>
      ),
      value: result.awayGoals ?? '-',
    },
  ];

  return (
    <ConfirmationModal
      loading={loading}
      onConfirm={onConfirm}
      title={t('BUTTONS.CONFIRM_RESULTS')}
      btn={
        <CustomButton color="tertiary" variant="text">
          <AppIcon icon={APP_ICONS.CONFIRMED} size="20px" color="primary" />
        </CustomButton>
      }
    >
      {t('MESSAGES.CONFIRM_RESULTS', { count: results.length })}
      <>
        <SectionContainer>
          {results.map(result => (
            <SectionContainer key={result._id}>
              <TextList data={listItems(result)} />
            </SectionContainer>
          ))}
        </SectionContainer>
      </>
    </ConfirmationModal>
  );
}
