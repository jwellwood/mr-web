import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../../../../../components';
import { FormContainer } from '../../../../../components/forms';
import {
  ControlledSelectInput,
  ControlledMultiSelectInput,
} from '../../../../../components/inputs';
import { FormModal } from '../../../../../components/modals';
import { TApolloError } from '../../../../../types/apollo';
import { getNumberOptions } from '../../../../../utils';
import { UpdateCompConfigSchema, type UpdateCompConfigFormData } from './validation';

interface Props {
  onSubmit: (formData: UpdateCompConfigFormData) => void;
  defaultValues: UpdateCompConfigFormData;
  loading: boolean;
  error?: TApolloError;
  numberOfTeams: number;
  numberOfCompetitions: number;
}

export default function UpdateCompConfigForm({
  onSubmit,
  defaultValues,
  numberOfTeams,
  numberOfCompetitions,
  loading,
  error,
}: Props) {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control } = useForm<UpdateCompConfigFormData>({
    defaultValues,
    resolver: zodResolver(UpdateCompConfigSchema),
    mode: 'onChange',
  });

  const submitHandler = (data: UpdateCompConfigFormData) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <>
      <CustomButton onClick={() => setOpen(true)} variant="text">
        Edit
      </CustomButton>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <FormContainer onSubmit={handleSubmit(submitHandler)} loading={loading} error={error}>
          <ControlledSelectInput
            control={control}
            name="rounds"
            label="Rounds"
            options={getNumberOptions(50, 0)}
          />
          <ControlledMultiSelectInput
            control={control}
            name="splitIndexes"
            label="Show split after position"
            options={getNumberOptions(numberOfTeams, 0)}
            showLabels
          />
          <ControlledMultiSelectInput
            control={control}
            name="promotionPositions"
            label="Promotion Spots"
            options={getNumberOptions(numberOfTeams, 1)}
          />
          <ControlledMultiSelectInput
            control={control}
            name="relegationPositions"
            label="Relegation Spots"
            options={getNumberOptions(numberOfTeams, 1)}
          />
          <ControlledSelectInput
            control={control}
            name="priority"
            label="Priority"
            options={getNumberOptions(numberOfCompetitions - 1, 0)}
          />
        </FormContainer>
      </FormModal>
    </>
  );
}
