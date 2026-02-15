import countryList from 'react-select-country-list';
import { CustomAccordion } from '../../../../components/accordion';
import { FlagIcon } from '../../../../components/icons';
import { TextList } from '../../../../components/lists';
import { PresentationModal } from '../../../../components/modals';
import { CustomTypography } from '../../../../components/typography';
import { FETCH_SQUAD_STATS_QUERY } from '../../types';
import { groupNationalities } from '../../utils';

interface Props {
  players?: FETCH_SQUAD_STATS_QUERY['stats'];
  title: string;
}

export default function ByNationality({ players, title }: Props) {
  const countryName = (code: string) => (code ? countryList().getLabel(code) : null);

  const playersByNationality = (item: { key: string; players: typeof players }) => {
    const listData = item?.players?.map(player => ({ label: player.name }));

    return (
      <CustomAccordion
        key={item.key}
        isExpanded={false}
        title={
          <CustomTypography color="data" bold>
            <FlagIcon nationality={item.key} /> {countryName(item.key)}
            <div style={{ display: 'inline-flex', marginLeft: '8px' }}>
              <CustomTypography color="label" bold size="xs">
                ( {listData?.length} )
              </CustomTypography>
            </div>
          </CustomTypography>
        }
      >
        <TextList data={listData} labelSize="sm" />
      </CustomAccordion>
    );
  };

  return (
    <PresentationModal
      title="Nationalities"
      buttonElement={
        <CustomTypography color="primary" size="sm" bold>
          {title}
        </CustomTypography>
      }
    >
      {groupNationalities(players).map(item => {
        return playersByNationality(item as { key: string; players: typeof players });
      })}
    </PresentationModal>
  );
}
