import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import { LinksList } from '../../../../components/lists';
import { useCustomParams } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYER_TROPHIES } from '../../graphql';
import { getTrophyListItem } from './getTrophyListItem';

interface Props {
  data?: T_FETCH_PLAYER_TROPHIES;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerTrophiesView({ data, loading, error }: Props) {
  const { t } = useTranslation('players');
  const { teamId, orgId } = useCustomParams();
  const baseUrl = `/org/${orgId}/team/${teamId}`;
  const winner = () =>
    data?.trophies
      .filter(trophy => trophy.isWinner)
      .map(winner => getTrophyListItem(winner, baseUrl));
  const runnerUp = () =>
    data?.trophies
      .filter(trophy => !trophy.isWinner)
      .map(runnerUp => getTrophyListItem(runnerUp, baseUrl));

  const renderContent = () => {
    if (data && data?.trophies.length === 0) {
      return <NoDataText>{t('MESSAGES.NO_TROPHIES')}</NoDataText>;
    }
    return (
      <>
        <SectionContainer type="winner" subtitle={t('SECTIONS.WINNER')}>
          <LinksList links={winner()} loading={loading} />
        </SectionContainer>
        <SectionContainer subtitle={t('SECTIONS.RUNNER_UP')}>
          <LinksList links={runnerUp()} loading={loading} />
        </SectionContainer>
      </>
    );
  };

  return (
    <SectionContainer title={t('SECTIONS.TROPHIES')}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
