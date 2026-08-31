import { CustomTypography, SectionContainer } from '../../../../components';
import { CustomGridContainer, CustomGridItem, CustomStack } from '../../../../components/grids';
import { parseDate } from '../../../../utils';
import { T_FETCH_RESULTS } from '../../graphql';
import ResultStatus from '../ResultStatus';

interface Props {
  results: T_FETCH_RESULTS['results'];
  selectedTeam: string;
}

export default function TeamResults({ results, selectedTeam }: Props) {
  const data = results[0];
  const { homeGoals, awayGoals, homeTeam, awayTeam } = data;
  const team = (team: { teamName: string; _id: string } | null) => (
    <CustomTypography size="sm" bold color={team?._id === selectedTeam ? 'data' : 'label'}>
      {team?.teamName}
    </CustomTypography>
  );
  return (
    <SectionContainer>
      <CustomStack direction="row" divider={true} justify="flex-start" align="center">
        <CustomTypography size="xs" bold color="label">
          {parseDate(data.date || '')}
        </CustomTypography>
        <CustomTypography size="xs" bold color="label">
          {data.kickoffTime}
        </CustomTypography>
        <ResultStatus resultStatus={data.resultStatus} display="text" />
      </CustomStack>
      <CustomGridContainer>
        <CustomGridItem size={5}>{team(homeTeam)}</CustomGridItem>
        <CustomGridItem size={2}>
          <SectionContainer>
            <CustomStack direction="row" divider justify="center">
              <CustomTypography size="sm" bold color="data">
                {homeGoals}
              </CustomTypography>
              <CustomTypography size="sm" bold color="data">
                {awayGoals}
              </CustomTypography>
            </CustomStack>
          </SectionContainer>
        </CustomGridItem>
        <CustomGridItem size={5}>{team(awayTeam)}</CustomGridItem>
      </CustomGridContainer>
    </SectionContainer>
  );
}
