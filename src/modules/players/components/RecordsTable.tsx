import React from 'react';
import CustomAvatar from 'components/avatars/CustomAvatar';
import { SectionContainer } from 'components/containers';
import TextList from 'components/lists/TextList';
import { CustomTypography } from 'components/typography';
import { theme } from 'theme';
import { IListItem } from 'types';
import RecordPlayers from './RecordPlayers';

type Props = {
  label: string;
  stat: string;
  value: string;
};

const RecordsTable: React.FC<Props> = ({ label, stat, value }) => {
  return (
    <SectionContainer background={theme.palette.dark.main}>
      <CustomTypography color="label" bold size="xs">
        {label}
      </CustomTypography>

      {value[stat]?.map((item, i) => {
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
              <CustomAvatar
                size="24px"
                isList
                border={getBackground()}
                shadow={getBackground()}
              >
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

        return (
          <TextList data={data.filter((item) => !item.disabled)} key={i} />
        );
      })}
    </SectionContainer>
  );
};

export default RecordsTable;
