import { useTranslation } from 'react-i18next';
import { CustomTypography, DataError, SectionContainer } from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import { APP_ICONS, AppIcon } from '../../../components/icons';
import { TextList } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import { TTiebreaker } from '../constants';
import UpdateCompConfig from '../forms/competition-configs/UpdateCompConfig';
import { T_FETCH_ORG_SEASON } from '../graphql';
import { useCompetitionConfigs } from '../hooks/useCompetitionConfigs';
import SeasonConfigTeams from './SeasonConfigTeams';

interface Props {
  season?: T_FETCH_ORG_SEASON['orgSeason'];
  loading?: boolean;
  error?: TApolloError;
}

export default function SeasonConfig({ season, loading, error }: Props) {
  const { t } = useTranslation('seasons');

  const { sortedCompetitionConfigs, compType } = useCompetitionConfigs(season);

  const renderContent = () => {
    if (loading) return <Spinner />;
    if (error) return <DataError error={error} />;
    const getTiebreakerString = (tiebreaker?: string | null) => {
      if (tiebreaker === TTiebreaker.HEAD_TO_HEAD) {
        return t('CONFIG.HEAD_TO_HEAD');
      }
      if (tiebreaker === TTiebreaker.PENALTIES) {
        return t('CONFIG.PENALTIES');
      }
      return t('CONFIG.GOAL_DIFFERENCE'); // default to goal difference if not specified
    };

    return sortedCompetitionConfigs?.map(config => {
      const {
        priority,
        rounds,
        tiebreaker,
        competitionId,
        relegationPositions,
        promotionPositions,
        splitIndexes,
        teams,
      } = config;

      const isValid = rounds && +rounds > 0 && teams && teams?.length > 0;

      const isCup = compType(competitionId._id).toLowerCase() === 'cup';

      const compLinks = [
        {
          label: t('CONFIG.TYPE'),
          value: isCup ? t('CONFIG.CUP') : t('CONFIG.LEAGUE'),
        },
        {
          label: t('CONFIG.ROUNDS'),
          value: rounds || <AppIcon icon={APP_ICONS.DISPUTED} color="warning" />,
        },
        {
          label: t('CONFIG.TIEBREAKER'),
          value: getTiebreakerString(tiebreaker),
        },
        ...(!isCup
          ? [
              {
                label: t('CONFIG.RELEGATION'),
                value: relegationPositions?.length ? relegationPositions?.join(', ') : '-',
              },
              {
                label: t('CONFIG.PROMOTION'),
                value: promotionPositions?.length ? promotionPositions?.join(', ') : '-',
              },
              {
                label: t('CONFIG.SPLIT'),
                value: splitIndexes?.length ? splitIndexes?.join(', ') : '-',
              },
            ]
          : []),
      ];

      return (
        <CustomAccordion
          key={competitionId._id}
          title={
            <>
              <CustomTypography color="label" bold>
                #{priority || '-'}{' '}
                <CustomTypography color="data" bold>
                  {competitionId.name}
                </CustomTypography>{' '}
              </CustomTypography>
              {isValid ? (
                <AppIcon icon={APP_ICONS.CHECK} color="success" />
              ) : (
                <AppIcon icon={APP_ICONS.DISPUTED} color="warning" />
              )}
            </>
          }
          isExpanded={false}
        >
          <SectionContainer type={isValid ? 'form' : 'warning'}>
            <UpdateCompConfig
              competitionName={competitionId.name}
              competitionId={competitionId._id}
              existingConfig={config}
              numberOfTeams={season?.teamIds?.length || 0}
              numberOfCompetitions={season?.competitionConfigs?.length || 0}
              seasonTeamIds={season?.teamIds || []}
              seasonCompetitionConfigs={season?.competitionConfigs || []}
            />
            <TextList data={compLinks} />
            <SeasonConfigTeams teams={config.teams} isCup={isCup} />
          </SectionContainer>
        </CustomAccordion>
      );
    });
  };

  return renderContent();
}
