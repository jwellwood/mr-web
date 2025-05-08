import React from 'react';
import { useForm } from 'react-hook-form';

import { IAward } from '../types';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import ControlledMultiSelectInput
  from "../../../components/inputs/ControlledMultiSelectInput.tsx";

interface Props {
  onSubmit: (data: Partial<IAward>) => void;
  defaultValues: Partial<IAward>;
  playersOptions: ISelectOptions[];
}
const AwardForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  playersOptions,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IAward>({
    defaultValues,
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="awardName"
            label="Award Name"
            errors={errors.awardName ? [errors.awardName] : []}
            placeholder="e.g. Player of the Season"
          />
        </GridItem>
        <GridItem>
          <ControlledMultiSelectInput
            control={control}
            name="winners"
            label="Winners"
            options={playersOptions}
            errors={errors.winners && "name" in errors.winners ? typeof errors.winners.name === "string" ? [errors.winners.name] : [] : []}
            showLabels
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="awardValue"
            label="Value"
            errors={errors.awardValue ? [errors.awardValue] : []}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="comment"
            label="Comment"
            errors={errors.comment ? [errors.comment] : []}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default AwardForm;
