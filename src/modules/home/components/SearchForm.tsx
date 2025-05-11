import { useForm } from 'react-hook-form';
import { FormContainer } from '../../../components/containers';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';

type Props = {
  defaultValues: { teamName: string };
  onSubmit: (data: { teamName: string }) => void;
};

export const SearchForm = ({ defaultValues, onSubmit }: Props) => {
  console.log("SearchForm")
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
  const teamNameLength = watch('teamName');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      nonAbsoluteSubmit
      text="Search"
      disabled={teamNameLength.length < 3}
    >
      <h1>Searchform</h1>
      <ControlledTextInput
        control={control}
        name="teamName"
        rules={{ minLength: 3 }}
        label="Search Team"
        errors={errors.teamName ? [errors.teamName] : []}
      />
    </FormContainer>
  );
};
