import { SectionContainer } from '../../../../components/containers';
import { TextList } from '../../../../components/lists';
import { parseDate } from '../../../../utils';
import { T_FETCH_RESULT } from '../graphql';
import ResultBox from './ResultBox';

interface Props {
  result: T_FETCH_RESULT['result'];
}

export default function ResultDetails({ result }: Props) {
  const { date, gameWeek, competitionId, orgSeasonId } = result;

  const list = [
    { label: 'Date', value: parseDate(date) || '' },
    { label: 'Season', value: orgSeasonId.name },
    { label: 'Gameweek', value: gameWeek },
    { label: 'Competition', value: competitionId.name },
  ];

  return (
    <SectionContainer>
      <TextList data={list} />
      <ResultBox result={result} />
    </SectionContainer>
  );
}
