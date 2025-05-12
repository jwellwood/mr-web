import CustomAvatar from '../../../components/avatars/CustomAvatar';
import { SectionContainer } from '../../../components/containers';
import TextList from '../../../components/lists/TextList';
import { CustomTypography } from '../../../components/typography';
import { IListItem } from '../../../types';
import RecordPlayers from './RecordPlayers';
import { theme } from '../../../theme';

type ValueType = object & {
  [key: string]: {
    value: number;
    disabled: boolean;
    names: {
      name: string;
      id: string;
    }[];
  }[];
};

type Props<
  T extends ValueType,
  K = T extends Record<
    infer U,
    {
      value: number;
      disabled: boolean;
    }[]
  >
    ? U
    : never,
> = {
  label: string;
  stat: K;
  value: T;
};

function RecordsTable<T extends ValueType>({ label, stat, value }: Props<T>) {
  const statField = value[stat];
  return (
    <SectionContainer background={theme.palette.dark.main}>
      <CustomTypography color="label" bold size="xs">
        {label}
      </CustomTypography>

      {statField.map((item, i) => {
        const getBackground = () => {
          let color = 'secondary';
          if (i === 0) {
            color = 'gold';
          }
          if (i === 1) {
            color = 'silver';
          }
          if (i === 2) {
            color = 'bronze';
          }
          return color;
        };

        const data: IListItem[] = [
          {
            avatar: (
              <CustomAvatar size="24px" isList border={getBackground()} shadow={getBackground()}>
                <CustomTypography bold size="xs" color="data">
                  {i + 1}
                </CustomTypography>
              </CustomAvatar>
            ),
            value: (
              <CustomTypography color="data" bold size="xs">
                {item.value}
              </CustomTypography>
            ),
            label: <RecordPlayers item={item} />,
            disabled: item.value === 0,
          },
        ];

        return <TextList data={data.filter(item => !item.disabled)} key={i} />;
      })}
    </SectionContainer>
  );
}

export default RecordsTable;
