import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionContainer, SelectInput } from '../../../../components';
import { CustomAccordion } from '../../../../components/accordion';
import { FlagIcon } from '../../../../components/icons';
import { Spinner } from '../../../../components/loaders';
import { CustomTable } from '../../../../components/tables';
import { CustomTypography } from '../../../../components/typography';
import { useNationality } from '../../../../hooks/useNationality';
import { T_FETCH_PLAYER_PROFILES_QUERY } from '../../graphql';
import { groupByBirthMonth, groupByPosition, groupNationalities } from '../../utils';
import { columns, rows } from '../tables/grouped-players-table';

type GroupBy = 'nationality' | 'position' | 'birthday';
type TPlayers = T_FETCH_PLAYER_PROFILES_QUERY['players'];
type TGroupItem = { key: string; players: TPlayers };

interface Props {
  players?: TPlayers;
  title: string;
  loading?: boolean;
}

export default function ByProfileGroup({ players, loading }: Props) {
  const { t, i18n } = useTranslation('squad');
  const { getCountryName } = useNationality();
  const [groupBy, setGroupBy] = useState<GroupBy>('nationality');

  const getGroupLabel = (key: string) => {
    switch (groupBy) {
      case 'nationality':
        return (
          <>
            <FlagIcon nationality={key} /> {getCountryName(key)}
          </>
        );
      case 'position':
        return key || t('GROUP_BY.UNKNOWN');
      case 'birthday': {
        if (key === '00') return t('GROUP_BY.UNKNOWN');
        const month = parseInt(key, 10);
        return new Intl.DateTimeFormat(i18n.language, { month: 'long' }).format(
          new Date(2000, month - 1, 1)
        );
      }
    }
  };

  const getGrouped = (): TGroupItem[] => {
    switch (groupBy) {
      case 'nationality':
        return groupNationalities(players) as TGroupItem[];
      case 'position':
        return groupByPosition(players);
      case 'birthday':
        return groupByBirthMonth(players);
    }
  };

  const renderAccordion = (item: TGroupItem) => {
    const tableRows = rows({ players: item.players });

    return (
      <CustomAccordion
        key={item.key}
        isExpanded={false}
        title={
          <CustomTypography color="data" bold>
            {getGroupLabel(item.key)}
            <div style={{ display: 'inline-flex', marginLeft: '8px' }}>
              <CustomTypography color="label" bold size="xs">
                ( {item.players?.length} )
              </CustomTypography>
            </div>
          </CustomTypography>
        }
      >
        <CustomTable
          rows={tableRows ?? []}
          columns={columns}
          isSortable={false}
          loadingRowCount={5}
        />
      </CustomAccordion>
    );
  };

  const onChange = (event: SelectChangeEvent<string | number>) => {
    setGroupBy(event.target.value as GroupBy);
  };

  const options = [
    { value: 'nationality', label: t('GROUP_BY.NATIONALITY') },
    { value: 'position', label: t('GROUP_BY.POSITION') },
    { value: 'birthday', label: t('GROUP_BY.BIRTHDAY') },
  ];

  return (
    <>
      <SectionContainer
        type="success"
        title={loading ? '-' : `${players?.length} ${t('GROUP_BY.PLAYERS')}`}
      >
        <SelectInput
          inputName="groupBy"
          value={groupBy}
          onChange={onChange}
          options={options}
          label={t('GROUP_BY.LABEL')}
          errors={[]}
        />
      </SectionContainer>

      {loading ? <Spinner /> : getGrouped().map(item => renderAccordion(item))}
    </>
  );
}
