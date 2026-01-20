import { useForm } from 'react-hook-form';

import type { DeleteTeamFormData } from './validation';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { CenteredGrid } from '../../../../components/grids';

interface Props {
  onSubmit: (data: DeleteTeamFormData) => void;
  defaultValues?: DeleteTeamFormData;
  teamName: string;
  loading: boolean;
}
export default function DeleteTeamForm({ onSubmit, defaultValues, teamName, loading }: Props) {
  const { handleSubmit, control, watch } = useForm<DeleteTeamFormData>({
    defaultValues,
  });

  const candidateName = watch('teamName');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ disabled: candidateName !== teamName }}
      loading={loading}
    >
      <CenteredGrid dir="row">
        <ControlledTextInput control={control} name="teamName" label="Team Name" />
      </CenteredGrid>
    </FormContainer>
  );
}
