import countryList from 'react-select-country-list';

import { IPastPlayer } from '../types.ts';
import { SectionContainer } from '../../../components/containers';
import { CustomTypography } from '../../../components/typography';
import FlagIcon from '../../../components/icons/FlagIcon.tsx';
import TextList from '../../../components/lists/TextList.tsx';
import { PresentationModal } from '../../../components/modals';
import { CustomButton } from '../../../components/buttons';
import { IPlayer } from '../../players/types.ts';

interface Props {
  players: IPlayer[] | IPastPlayer[];
  title: string;
  variant?: 'text' | 'outlined' | 'contained';
  padding?: string;
  textColor?: string;
}

export default function ByNationality({
  players,
  title,
  variant,
  padding,
  textColor = 'primary',
}: Props) {
  const countryName = (code: string) => (code ? countryList().getLabel(code) : null);
  const groupNationalities = () => {
    const playersMap = (players as IPlayer[]).reduce(
      (
        acc: {
          [key: string]: IPlayer[];
        },
        cur
      ) => {
        acc[cur.nationality] = acc[cur.nationality] || [];
        acc[cur.nationality].push(cur);
        return acc;
      },
      {}
    );
    return Object.entries(playersMap)
      .map(item => {
        return { key: item[0], players: item[1] as IPlayer[] };
      })
      .sort((a, b) => {
        if (a.players.length > b.players.length) {
          return -1;
        } else if (a.players.length < b.players.length) {
          return 1;
        }
        if (a.key < b.key) {
          return -1;
        } else if (a.key > b.key) {
          return 1;
        }
        return 0;
      });
  };

  const playersByNationality = (item: { key: string; players: IPlayer[] }) => {
    const listData = item?.players?.map(player => ({ label: player.name }));

    return (
      <SectionContainer key={item.key}>
        <CustomTypography color="data" bold size="sm">
          <FlagIcon nationality={item.key} /> {countryName(item.key)}
          <div style={{ display: 'inline-flex', marginLeft: '8px' }}>
            <CustomTypography color="label" bold size="xs">
              ( {listData.length} )
            </CustomTypography>
          </div>
        </CustomTypography>
        <TextList data={listData} labelSize="xs" />
      </SectionContainer>
    );
  };

  return (
    <PresentationModal
      title="Nationalities"
      buttonElement={
        <CustomButton variant={variant} padding={padding}>
          <CustomTypography color={textColor} size="xs" bold>
            {title}
          </CustomTypography>
        </CustomButton>
      }
    >
      {groupNationalities().map(item => {
        return playersByNationality(item);
      })}
    </PresentationModal>
  );
}
