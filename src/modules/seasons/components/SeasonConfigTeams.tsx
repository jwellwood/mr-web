import { useTranslation } from 'react-i18next';
import { CustomTypography, DataError } from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import { TextList } from '../../../components/lists';

interface Props {
  teams?:
    | {
        startingPoints: number | null;
        teamId: {
          _id: string;
          teamName: string;
        };
      }[]
    | null;
  isCup: boolean;
}

export default function SeasonConfigTeams({ teams, isCup }: Props) {
  const { t } = useTranslation('seasons');
  return teams && teams.length > 0 ? (
    <CustomAccordion
      title={
        <CustomTypography color="primary" bold>
          {isCup ? t('CONFIG.TEAMS') : `${t('CONFIG.TEAMS')} / ${t('CONFIG.STARTING_POINTS')}`}
        </CustomTypography>
      }
      isExpanded={false}
    >
      <>
        {teams.map(team => (
          <TextList
            key={team.teamId._id}
            data={[
              {
                label: (
                  <CustomTypography color="data" bold>
                    {team.teamId.teamName}
                  </CustomTypography>
                ),
                value: team.startingPoints ?? '-',
              },
            ]}
          />
        ))}
      </>
    </CustomAccordion>
  ) : (
    <DataError error={{ message: t('CONFIG.NO_TEAMS') }} />
  );
}
