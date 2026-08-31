import { useTranslation } from 'react-i18next';
import { useCustomParams } from '../../../hooks';
import { getNumberOptions } from '../../../utils';
import { getCupRoundLabel } from '../helpers/getCupRoundLabel';
import useCompetitionConfig from './useCompetitionConfig';

export const useResultInputs = (currentCompetitionId: string) => {
  const { t } = useTranslation('results');
  const { orgSeasonId } = useCustomParams();
  const { competitionConfig, loading } = useCompetitionConfig(orgSeasonId);

  const currentCompetitionConfig = competitionConfig?.find(
    config => config.id === currentCompetitionId
  );

  const competitionOptions = competitionConfig?.map(config => ({
    value: config.id,
    label: config.name,
  }));

  const isCup = currentCompetitionConfig?.type === 'Cup';

  const teamOptions = currentCompetitionConfig?.teams
    ? currentCompetitionConfig.teams.map(team => ({
        value: team.teamId._id,
        label: team.teamId.teamName,
      }))
    : [];

  const rounds = currentCompetitionConfig?.rounds || 0;
  const roundOptions = getNumberOptions(rounds, 1).map(option => ({
    value: option.value,
    label: isCup
      ? getCupRoundLabel(Number(option.value), rounds, t)
      : `${t('LABELS.ROUND')} ${option.label}`,
  }));

  const decisionOptions = [
    { label: '', value: '' },
    { label: t('FORM.OPTIONS.DECISION.EXTRA_TIME'), value: 'EXTRA_TIME' },
    { label: t('FORM.OPTIONS.DECISION.PENALTIES'), value: 'PENALTIES' },
  ];
  const winnerSideOptions = [
    { label: '', value: '' },
    { label: t('FORM.OPTIONS.WINNER_SIDE.HOME'), value: 'HOME' },
    { label: t('FORM.OPTIONS.WINNER_SIDE.AWAY'), value: 'AWAY' },
  ];

  return {
    loading,
    competitionOptions,
    teamOptions,
    roundOptions,
    decisionOptions,
    winnerSideOptions,
    isCup,
  };
};
