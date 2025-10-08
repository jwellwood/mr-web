import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import ControlledDateInput from '../../../components/inputs/ControlledDateInput';
import ControlledSelectInput from '../../../components/inputs/ControlledSelectInput';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { isFuture } from 'date-fns';
import { ICompetition, IListItem, ITempMatch } from '../../../types';
import { getIntegers } from '../../../utils/helpers';
import { cupRoundOptions } from '../constants';
import SwitchButtonList from '../../../components/common/SwitchButtonList';

interface Props {
  onSubmit: (data: ITempMatch) => void;
  defaultValues: ITempMatch;
  seasonOptions: ISelectOptions[];
  opponentOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  competitions: ICompetition[];
}
const AddMatchDetailsForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  seasonOptions,
  opponentOptions,
  competitions,
  competitionOptions,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ITempMatch>({
    defaultValues,
  });

  const date = watch('date');
  const isFutureMatch = isFuture(new Date(date));

  const competitionId = watch('competitionId');
  const selectedCompetition = competitions.find(comp => comp._id === competitionId);
  const isCup =
    selectedCompetition?.competitionType === 'Cup' ||
    selectedCompetition?.competitionType === 'Tournament';

  const switchList: IListItem[] = [
    {
      label: 'Home?',
      value: 'isHome',
    },
    {
      label: 'Forfeit?',
      value: 'isForfeit',
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} text="Next">
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="date"
            label="Date"
            errors={errors.date ? [errors.date] : []}
            disableFuture={false}
          />
        </GridItem>
        <GridItem size={12}>
          <SwitchButtonList control={control} data={switchList} />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="opponentId"
            label="Opponent"
            rules={{ required: true }}
            errors={errors.opponentId ? [errors.opponentId] : []}
            options={opponentOptions}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="competitionId"
            label="Competition"
            rules={{ required: true }}
            errors={errors.competitionId ? [errors.competitionId] : []}
            options={competitionOptions}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="seasonId"
            label="Season"
            rules={{ required: true }}
            errors={errors.seasonId ? [errors.seasonId] : []}
            options={seasonOptions}
          />
        </GridItem>

        {!isFutureMatch && (
          <>
            <GridItem size={12}>
              <ControlledSelectInput
                control={control}
                name="teamGoals"
                label="Goals Scored"
                errors={errors.teamGoals ? [errors.teamGoals] : []}
                options={getIntegers(selectedCompetition?.matchMinutes)}
              />
            </GridItem>
            <GridItem size={12}>
              <ControlledSelectInput
                control={control}
                name="opponentGoals"
                label="Goals Conceded"
                errors={errors.opponentGoals ? [errors.opponentGoals] : []}
                options={getIntegers(selectedCompetition?.matchMinutes)}
              />
            </GridItem>

            {selectedCompetition?.competitionType === 'League' && (
              <GridItem size={12}>
                <ControlledSelectInput
                  control={control}
                  name="leaguePosition"
                  label="League Position"
                  errors={errors.leaguePosition ? [errors.leaguePosition] : []}
                  options={getIntegers(selectedCompetition.numberOfTeams)}
                />
              </GridItem>
            )}
            {isCup && (
              <GridItem size={12}>
                <ControlledSelectInput
                  control={control}
                  name="cupRound"
                  label="Cup Round"
                  errors={errors.cupRound ? [errors.cupRound] : []}
                  options={cupRoundOptions}
                />
              </GridItem>
            )}
          </>
        )}
      </CenteredGrid>
    </FormContainer>
  );
};

export default AddMatchDetailsForm;
