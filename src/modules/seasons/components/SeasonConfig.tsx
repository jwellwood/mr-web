import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { CustomTypography, DataError, SectionContainer } from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import { APP_ICONS, AppIcon } from '../../../components/icons';
import { TextList } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import { FETCH_COMPETITIONS } from '../../competitions/graphql';
import { isCupCompetitionType, TTiebreaker } from '../constants';
import UpdateCompConfig from '../forms/competition-configs/UpdateCompConfig';
import { T_FETCH_ORG_SEASON } from '../graphql';

interface Props {
  season?: T_FETCH_ORG_SEASON['orgSeason'];
  loading?: boolean;
  error?: TApolloError;
}

export default function SeasonConfig({ season, loading, error }: Props) {
  const { t } = useTranslation('seasons');
  const { orgId } = useCustomParams();

  const { data: competitionsData } = useQuery(FETCH_COMPETITIONS, {
    variables: { orgId: orgId! },
  });

  const competitionTypeById = new Map(
    competitionsData?.org?.competitions?.map(comp => [comp._id, comp.competitionType]) ?? []
  );

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

    return season?.competitionConfigs?.map(config => {
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
      const isCup = isCupCompetitionType(competitionTypeById.get(competitionId._id));
      const compLinks = [
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
        <SectionContainer
          key={competitionId._id}
          type={isValid ? 'form' : 'warning'}
          title={`${priority ? `#${priority}` : ''}
              ${competitionId.name}`}
          secondaryAction={
            <UpdateCompConfig
              competitionName={competitionId.name}
              competitionId={competitionId._id}
              existingConfig={config}
              numberOfTeams={season.teamIds.length}
              numberOfCompetitions={season.competitionConfigs?.length || 0}
              seasonTeamIds={season.teamIds}
              seasonCompetitionConfigs={season.competitionConfigs || []}
            />
          }
        >
          <TextList data={compLinks} />
          {config.teams && config.teams.length > 0 ? (
            <CustomAccordion
              title={
                <CustomTypography color="primary" bold>
                  {isCup
                    ? t('CONFIG.TEAMS')
                    : `${t('CONFIG.TEAMS')} / ${t('CONFIG.STARTING_POINTS')}`}
                </CustomTypography>
              }
              isExpanded={false}
            >
              <>
                {config.teams.map(team => (
                  <TextList
                    key={team.teamId._id}
                    data={[
                      {
                        label: (
                          <CustomTypography color="data" bold>
                            {team.teamId.teamName}
                          </CustomTypography>
                        ),
                        value: team.startingPoints ?? '-',
                      },
                    ]}
                  />
                ))}
              </>
            </CustomAccordion>
          ) : null}
        </SectionContainer>
      );
    });
  };

  return renderContent();
}
