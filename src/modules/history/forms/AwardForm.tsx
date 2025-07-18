import React from 'react';
import { useForm } from 'react-hook-form';
import { IAward } from '../types';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import ControlledMultiSelectInput from '../../../components/inputs/ControlledMultiSelectInput.tsx';
import DeleteModal from '../../../components/modals/DeleteModal.tsx';

interface Props {
  onSubmit: (data: Partial<IAward>) => void;
  defaultValues: Partial<IAward>;
  playersOptions: ISelectOptions[];
  onDelete?: () => void;
  deleteLoading?: boolean;
}
const AwardForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  playersOptions,
  onDelete,
  deleteLoading,
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
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="awardName"
            label="Award Name"
            errors={errors.awardName ? [errors.awardName] : []}
            placeholder="e.g. Player of the Season"
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledMultiSelectInput
            control={control}
            name="winners"
            label="Winners"
            options={playersOptions}
            errors={
              errors.winners && 'name' in errors.winners
                ? typeof errors.winners.name === 'string'
                  ? [errors.winners.name]
                  : []
                : []
            }
            showLabels
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="awardValue"
            label="Value"
            errors={errors.awardValue ? [errors.awardValue] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="comment"
            label="Comment"
            errors={errors.comment ? [errors.comment] : []}
          />
        </GridItem>
      </CenteredGrid>
      {onDelete && <DeleteModal onDelete={onDelete} title="Award" loading={deleteLoading} />}
    </FormContainer>
  );
};

export default AwardForm;
