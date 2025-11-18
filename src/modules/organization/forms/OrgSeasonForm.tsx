import { useForm } from 'react-hook-form';

import ControlledDateInput from '../../../components/inputs/ControlledDateInput';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { IOrgSeason, IOrgSeasonInput } from '../types';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import { DeleteModal } from '../../../components/modals';
import SwitchButtonList from '../../../components/forms/SwitchButtonList';
import { IListItem } from '../../../components/lists/types';

type Props = {
  onSubmit: (formData: IOrgSeasonInput) => void;
  defaultValues: IOrgSeasonInput;
  onDelete?: () => void;
  deleteLoading?: boolean;
};

export default function OrgSeasonForm({ onSubmit, defaultValues, onDelete, deleteLoading }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IOrgSeason>({
    defaultValues,
  });

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
            rules={{ required: true }}
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
      {onDelete && <DeleteModal onDelete={onDelete} title="Season" loading={deleteLoading} />}
    </FormContainer>
  );
}
