import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from 'components/containers';
import { CenteredGrid, GridItem } from 'components/grids';
import ControlledMultiSelectInput from 'components/inputs/ControlledMultiSelectInput';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { ISelectOptions } from 'components/inputs/SelectInput';
import { IAward } from '../types';

interface Props {
  onSubmit: (data: Partial<IAward>) => void;
  defaultValues: IAward;
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
  } = useForm<Partial<IAward>>({
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
            errors={errors.awardName}
            placeholder="e.g. Player of the Season"
          />
        </GridItem>
        <GridItem>
          <ControlledMultiSelectInput
            control={control}
            name="winners"
            label="Winners"
            options={playersOptions}
            errors={errors.winners}
            showLabels
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="awardValue"
            label="Value"
            errors={errors.awardValue}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="comment"
            label="Comment"
            errors={errors.comment}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default AwardForm;
