import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import ControlledDateInput from '../../../components/inputs/ControlledDateInput';
import ControlledSelectInput from '../../../components/inputs/ControlledSelectInput';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { DeleteModal } from '../../../components/modals';
import { ITeamSeason } from '../types';
import {getIntegers} from "../../../utils/helpers";

type Props = {
  onSubmit: (formData: Partial<ITeamSeason>) => void;
  defaultValues: Partial<ITeamSeason>;
  competitionOptions: ISelectOptions[];
  onDelete?: () => void;
  deleteLoading?: boolean;
};

const SeasonForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  competitionOptions,
  onDelete,
  deleteLoading,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Partial<ITeamSeason>>({
    defaultValues,
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem xs={6}>
          <ControlledDateInput
            control={control}
            name="yearStarted"
            label="Year Started"
            view="year"
            errors={errors.yearStarted ? [errors.yearStarted] : []}
          />
        </GridItem>
        <GridItem xs={6}>
          <ControlledDateInput
            control={control}
            name="yearEnded"
            label="Year Ended"
            view="year"
            disableFuture={false}
            errors={errors.yearEnded ? [errors.yearEnded] : []}
          />
        </GridItem>
        <GridItem xs={6}>
          <ControlledSelectInput
            control={control}
            name="division"
            label="Division"
            errors={errors.division ? [errors.division] : []}
            options={competitionOptions}
          />
        </GridItem>
        <GridItem xs={6}>
          <ControlledSelectInput
            control={control}
            name="leaguePosition"
            label="Final Position"
            errors={errors.leaguePosition ? [errors.leaguePosition] : []}
            options={getIntegers(50, 1)}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            multiline
            control={control}
            name="comment"
            label="Comment"
            errors={errors.comment ? [errors.comment] : []}
          />
        </GridItem>
      </CenteredGrid>
      {onDelete && (
        <DeleteModal
          onDelete={onDelete}
          title="Season"
          loading={deleteLoading}
        />
      )}
    </FormContainer>
  );
};

export default SeasonForm;
