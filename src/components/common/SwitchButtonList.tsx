import { Control, FieldValues, Path } from 'react-hook-form';
import ControlledSwitchInput from '../inputs/ControlledSwitchInput';
import { IListItem } from '../../types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CustomTypography } from '../typography';

type Props<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  data: IListItem[];
};

export function SwitchButtonList<T extends object>({ control, data }: Props<T>) {
  const switchComp = (name: string) => {
    return <ControlledSwitchInput control={control} name={name as Path<T>} />;
  };

  const items: IListItem[] = data.map(item => {
    return {
      label: item.label,
      value: switchComp(item.value as string),
    };
  });

  return (
    <List>
      {items.map((item, i) => {
        const { label, value, onClick } = item;

        return (
          <ListItem key={i} onClick={onClick} secondaryAction={value} sx={{ marginTop: 2 }}>
            <ListItemText
              primary={
                <CustomTypography color="label" size="md" bold>
                  {label}
                </CustomTypography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default SwitchButtonList;
