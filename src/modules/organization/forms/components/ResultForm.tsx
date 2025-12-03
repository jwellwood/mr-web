import { useForm } from 'react-hook-form';

import ControlledDateInput from '../../../../components/inputs/ControlledDateInput';
import { IResultInput } from '../../types';
import { FormContainer } from '../../../../components/containers';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import { ISelectOptions } from '../../../../components/inputs/SelectInput';
import ControlledSelectInput from '../../../../components/inputs/ControlledSelectInput';
import { getIntegers } from '../../../../utils/helpers';

type Props = {
  onSubmit: (formData: IResultInput) => void;
  competitionOptions: ISelectOptions[];
  teamOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
  defaultValues: IResultInput;
};

export default function ResultForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  teamOptions,
  orgSeasonOptions,
}: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<IResultInput>({
    defaultValues,
  });

  const homeTeam = watch('homeTeam');
  const awayTeam = watch('awayTeam');

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="date"
            label="Date"
            disableFuture={false}
            rules={{ required: true }}
            errors={errors.date ? [errors.date] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="orgSeasonId"
            label="Season"
            rules={{ required: true }}
            errors={errors.orgSeasonId ? [errors.orgSeasonId] : []}
            options={orgSeasonOptions}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="gameWeek"
            label="Game Week"
            rules={{ required: true }}
            errors={errors.gameWeek ? [errors.gameWeek] : []}
            options={getIntegers(52, 1)}
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
        <GridItem size={8}>
          <ControlledSelectInput
            control={control}
            name="homeTeam"
            label="Home Team"
            rules={{ required: true }}
            errors={errors.homeTeam ? [errors.homeTeam] : []}
            options={teamOptions}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledSelectInput
            control={control}
            name="homeGoals"
            label="Goals"
            rules={{ required: true }}
            errors={errors.homeGoals ? [errors.homeGoals] : []}
            options={getIntegers(50, 0)}
          />
        </GridItem>
        <GridItem size={8}>
          <ControlledSelectInput
            control={control}
            name="awayTeam"
            label="Away Team"
            rules={{ required: true, validate: () => homeTeam !== awayTeam }}
            errors={errors.awayTeam ? [errors.awayTeam] : []}
            options={teamOptions}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledSelectInput
            control={control}
            name="awayGoals"
            label="Goals"
            rules={{ required: true }}
            errors={errors.awayGoals ? [errors.awayGoals] : []}
            options={getIntegers(50, 0)}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
}
