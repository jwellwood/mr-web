import { useForm } from 'react-hook-form';

import ControlledDateInput from '../../../../components/inputs/ControlledDateInput';
import ControlledTextInput from '../../../../components/inputs/ControlledTextInput';
import { IOrgSeason, IOrgSeasonInput } from '../../types';
import { FormContainer } from '../../../../components/containers';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import SwitchButtonList from '../../../../components/forms/SwitchButtonList';
import { IListItem } from '../../../../components/lists/types';

type Props = {
  onSubmit: (formData: IOrgSeasonInput) => void;
  defaultValues: IOrgSeasonInput;
};

export default function OrgSeasonForm({ onSubmit, defaultValues }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<IOrgSeason>({
    defaultValues,
  });

  const yearStarted = watch('yearStarted');
  const yearEnded = watch('yearEnded');
  const yearStartAsNum = new Date(yearStarted).getFullYear();
  const yearEndAsNum = new Date(yearEnded).getFullYear();

  const switchList: IListItem[] = [
    {
      label: 'Is current season?',
      value: 'isCurrent',
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="yearStarted"
            label="Year Started"
            view="year"
            rules={{ required: true }}
            errors={errors.yearStarted ? [errors.yearStarted] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="yearEnded"
            label="Year Ended"
            view="year"
            disableFuture={false}
            rules={{ required: true, validate: () => yearStartAsNum <= yearEndAsNum }}
            errors={errors.yearEnded ? [errors.yearEnded] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <SwitchButtonList data={switchList} control={control} />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            multiline
            control={control}
            name="comment"
            label="Comment"
            errors={errors.comment ? [errors.comment] : []}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
}
