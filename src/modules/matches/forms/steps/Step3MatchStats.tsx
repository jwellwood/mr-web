import { useSelector } from 'react-redux';

import { SubmitButton } from '../../../../components/buttons';
import { Spinner } from '../../../../components/loaders';
import CustomTable from '../../../../components/tables/CustomTable.tsx';
import { IPlayerInMatch } from '../../../../types';
import { match_form_table, match_form_table_styles } from '../../configs';
import { statsDataAll } from '../../helpers';
import { validateStats } from '../../helpers/statsValidation.ts';
import AddMatchValidation from '../components/AddMatchValidation.tsx';
import { getTempMatch } from '../../../../store/features/matches/matchesSelector.ts';

interface Props {
  onNextClick: () => void;
  currentPlayers: IPlayerInMatch[];
}

export default function Step3MatchStats({ onNextClick, currentPlayers }: Props) {
  const tableData = statsDataAll(currentPlayers, true);
  const currentMatch = useSelector(getTempMatch);
  const { isValid } = validateStats(currentMatch, currentPlayers);

  return (
    <>
      <AddMatchValidation players={currentPlayers} match={currentMatch} />
      {tableData ? (
        <>
          <CustomTable
            columns={match_form_table}
            rows={tableData}
            isSortable={false}
            cellIndexStyles={match_form_table_styles}
          />
          <SubmitButton onClick={onNextClick} disabled={!isValid}>
            Next
          </SubmitButton>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}
