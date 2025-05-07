import React from 'react';
import { CustomButton } from 'components/buttons';
import { SectionContainer } from 'components/containers';
import FlagIcon from 'components/icons/FlagIcon';
import TextList from 'components/lists/TextList';
import { PresentationModal } from 'components/modals';
import { CustomTypography } from 'components/typography';
import countryList from 'react-select-country-list';
import { IPlayer } from 'types';
import { IPastPlayer } from 'types/IPastPlayer';

type Props = {
  players: IPlayer[] | IPastPlayer[];
  title: string;
  variant?: string;
  padding?: string;
  textColor?: string;
};

const ByNationality: React.FC<Props> = ({
  players,
  title,
  variant,
  padding,
  textColor,
}) => {
  const countryName = (code: string) =>
    code ? countryList().getLabel(code) : null;
  const groupNationalities = () => {
    const playersMap = (players as IPlayer[]).reduce((acc, cur) => {
      acc[cur.nationality] = acc[cur.nationality] || [];
      acc[cur.nationality].push(cur);
      return acc;
    }, {});
    return Object.entries(playersMap)
      .map((item) => {
        return { key: item[0], players: item[1] as any[] };
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

  const playersByNationality = (item) => {
    const listData = item?.players?.map((player) => ({ label: player.name }));

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
      {groupNationalities().map((item) => {
        return playersByNationality(item);
      })}
    </PresentationModal>
  );
};

export default ByNationality;
