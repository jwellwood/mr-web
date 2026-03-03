import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../../../../../components/buttons';
import { FormContainer } from '../../../../../components/forms';
import { ControlledSelectInput, ControlledSwitchInput } from '../../../../../components/inputs';
import { FormModal } from '../../../../../components/modals';
import { TApolloError } from '../../../../../types/apollo';
import { getNumberOptions } from '../../../../../utils';
import { type SubmitResultFormData, SubmitResultSchema } from './validation';

interface Props {
  onSubmit: (formData: SubmitResultFormData) => void;
  defaultValues: SubmitResultFormData;
  loading: boolean;
  error?: TApolloError;
  homeTeamName?: string;
  awayTeamName?: string;
}

export default function SubmitResultForm({
  onSubmit,
  defaultValues,
  loading,
  error,
  homeTeamName,
  awayTeamName,
}: Props) {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control } = useForm<SubmitResultFormData>({
    defaultValues,
    resolver: zodResolver(SubmitResultSchema),
    mode: 'onChange',
  });

  const submitHandler = (data: SubmitResultFormData) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <CustomButton>Submit Result</CustomButton>
      </span>
      <FormModal open={open} onClose={() => setOpen(false)} title="Submit Result">
        <FormContainer onSubmit={handleSubmit(submitHandler)} loading={loading} error={error}>
          <ControlledSelectInput
            control={control}
            name="homeGoals"
            label={`${homeTeamName} Goals`}
            options={getNumberOptions(99, 0)}
          />
          <ControlledSelectInput
            control={control}
            name="awayGoals"
            label={`${awayTeamName} Goals`}
            options={getNumberOptions(99, 0)}
          />
          <ControlledSwitchInput control={control} name="isForfeit" label="Forfeit" />
        </FormContainer>
      </FormModal>
    </>
  );
}
