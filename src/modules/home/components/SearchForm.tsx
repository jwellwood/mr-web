import { useForm } from 'react-hook-form';

import { FormContainer } from '../../../components/containers';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';

type Props = {
  defaultValues: { teamName: string };
  onSubmit: (data: { teamName: string }) => void;
  loading: boolean;
};

export default function SearchForm({ defaultValues, onSubmit, loading }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<{
    teamName: string;
  }>({
    defaultValues,
  });
  const teamName = watch('teamName');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      nonAbsoluteSubmit
      submitText="Search"
      disabled={teamName.length < 3}
      loading={loading}
    >
      <ControlledTextInput
        control={control}
        name="teamName"
        rules={{ minLength: 3 }}
        label="Team Name"
        errors={errors.teamName ? [errors.teamName] : []}
      />
    </FormContainer>
  );
}
