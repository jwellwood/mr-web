import { useForm } from 'react-hook-form';

import { IDeleteTeamForm } from '../../types';
import { FormContainer } from '../../../../components/containers';
import { CenteredGrid } from '../../../../components/grids';
import ControlledTextInput from '../../../../components/inputs/ControlledTextInput.tsx';

interface Props {
  onSubmit: (data: IDeleteTeamForm) => void;
  defaultValues?: IDeleteTeamForm;
  teamName: string;
  loading: boolean;
}
export default function DeleteTeamForm({ onSubmit, defaultValues, teamName, loading }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues,
  });

  const candidateName = watch('teamName');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      disabled={candidateName !== teamName}
      loading={loading}
    >
      <CenteredGrid dir="row">
        <ControlledTextInput
          control={control}
          name="teamName"
          rules={{ required: true }}
          label="Team Name"
          errors={errors.teamName ? [errors.teamName] : []}
        />
      </CenteredGrid>
    </FormContainer>
  );
}
