import { CustomAvatar, CustomTypography } from '../../../../components';
import { SectionContainer } from '../../../../components/containers';
import { CustomStack } from '../../../../components/grids';
import { TextList } from '../../../../components/lists';
import { parseDate } from '../../../../utils';
import { T_FETCH_RESULT } from '../graphql';
import ResultAdmin from './ResultAdmin';

interface Props {
  result: T_FETCH_RESULT['result'];
}

export default function ResultDetails({ result }: Props) {
  const { date, gameWeek, competitionId, orgSeasonId, homeTeam, awayTeam, homeGoals, awayGoals } =
    result;

  const goalsAvatar = (goals: number | null | undefined) => (
    <CustomAvatar bgColor="white" size="40px" variant="square">
      <CustomTypography size="lg" bold color="secondary">
        {typeof goals === 'number' ? goals : '-'}
      </CustomTypography>
    </CustomAvatar>
  );

  const scoreData = [
    {
      label: (
        <CustomTypography size="lg" bold color="data">
          {homeTeam.teamName}
        </CustomTypography>
      ),
      value: goalsAvatar(homeGoals),
    },
    {
      label: (
        <CustomTypography size="lg" bold color="data">
          {awayTeam.teamName}
        </CustomTypography>
      ),
      value: goalsAvatar(awayGoals),
    },
  ];

  return (
    <>
      <SectionContainer>
        <CustomStack direction="row" justify="space-between">
          <CustomTypography size="xs" bold color="label">
            {orgSeasonId.name}
          </CustomTypography>
          <CustomTypography size="xs" bold color="primary">
            {date ? parseDate(date) : ''}
          </CustomTypography>
        </CustomStack>
        <CustomTypography size="sm" bold color="label">
          {competitionId.name} - {gameWeek ? `Round ${gameWeek}` : ''}
        </CustomTypography>
        <TextList data={scoreData} />
      </SectionContainer>
      <ResultAdmin result={result} />
    </>
  );
}
