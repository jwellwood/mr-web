import { useForm } from 'react-hook-form';

import { FormContainer } from '../../../components/containers';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';

type Props = {
  defaultValues: { teamName: string };
  onSubmit: (data: { teamName: string }) => void;
};

export default function SearchForm({ defaultValues, onSubmit }: Props) {
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
      text="Search"
      disabled={teamName.length < 3}
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
