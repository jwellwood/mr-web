import { SectionContainer } from '../../../components';
import { TextList } from '../../../components/lists';
import { parseDate } from '../../../utils';
import { IResult } from '../types';
import ResultBox from './ResultBox';

interface Props {
  result: IResult;
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
