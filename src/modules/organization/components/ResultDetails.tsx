import TextList from '../../../components/lists/TextList';
import { parseDate } from '../../../utils/helpers';
import { IResult } from '../types';
import ResultBox from './ResultBox';

type Props = { result: IResult };

export default function ResultDetails({ result }: Props) {
  const { date, gameWeek, competitionId, orgSeasonId } = result;

  const list = [
    { label: 'Date', value: parseDate(date) || '' },
    { label: 'Season', value: orgSeasonId.name },
    { label: 'Gameweek', value: gameWeek },
    { label: 'Competition', value: competitionId.name },
  ];

  return (
    <>
      <TextList data={list} />
      <ResultBox result={result} />
    </>
  );
}
