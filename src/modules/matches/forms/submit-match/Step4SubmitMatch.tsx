import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FormContainer, SectionContainer, NoDataText } from '../../../../components';
import { getTempMatch, getTempPlayers } from '../../../../store';
import { TApolloError } from '../../../../types/apollo';
import MatchView from '../../components/match/MatchView';
import { T_FETCH_MATCH } from '../../graphql';

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

  const mapTempMatchDataToMatchData = () => {
    const mappedPlayers = currentPlayers.map(player => {
      return {
        ...player,
        playerId: {
          _id: player.playerId,
          name: player.playerName,
          position: player.matchPosition,
        },
      };
    });
    return {
      match: {
        ...currentMatch,
        teamId: {
          _id: currentMatch.teamId,
          teamName: currentMatch.teamName,
          teamBadge: currentMatch.teamBadgeUrl,
        },
        opponentId: {
          _id: currentMatch.opponentId,
          teamName: currentMatch.opponentName,
          teamBadge: currentMatch.opponentBadgeUrl,
        },
        seasonId: {
          _id: currentMatch.seasonId,
        },
        competitionId: {
          _id: currentMatch.competitionId,
          name: currentMatch.competitionName,
          competitionType: '',
        },
        matchPlayers: mappedPlayers,
      } as T_FETCH_MATCH['match'],
    };
  };

  return (
    <SectionContainer title={t('SECTIONS.SUMMARY')} type="success">
      <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
        {currentMatch.isForfeit ? (
          <NoDataText>{t('FORM.LABELS.FORFEITED_MATCH')}</NoDataText>
        ) : null}
        <MatchView
          data={mapTempMatchDataToMatchData()}
          loading={false}
          error={error}
          disableLink={true}
          showH2H={false}
        />
      </FormContainer>
    </SectionContainer>
  );
}
