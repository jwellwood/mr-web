import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer } from '../../../components';
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
      const isCup = isCupCompetitionType(competitionTypeById.get(config.competitionId._id));
      const compLinks = [
        {
          label: t('CONFIG.ROUNDS'),
          value: config.rounds || '-',
        },
        {
          label: t('CONFIG.TIEBREAKER'),
          value: getTiebreakerString(config.tiebreaker),
        },
        ...(!isCup
          ? [
              {
                label: t('CONFIG.RELEGATION'),
                value: config.relegationPositions?.join(', ') ?? '-',
              },
              {
                label: t('CONFIG.PROMOTION'),
                value: config.promotionPositions?.join(', ') ?? '-',
              },
              {
                label: t('CONFIG.SPLIT'),
                value: config.splitIndexes?.join(', ') || '-',
              },
            ]
          : []),
        {
          label: t('CONFIG.PRIORITY'),
          value: config.priority ?? '-',
        },
      ];
      return (
        <SectionContainer
          key={config.competitionId._id}
          title={config.competitionId.name}
          secondaryAction={
            <UpdateCompConfig
              competitionId={config.competitionId._id}
              existingConfig={config}
              numberOfTeams={season.teamIds.length}
              numberOfCompetitions={season.competitionConfigs?.length || 0}
            />
          }
        >
          <TextList data={compLinks} />
        </SectionContainer>
      );
    });
  };

  return renderContent();
}
