import { STAT_ICONS, StatIcon } from '../../../../components/icons';
import { LinksList, type IListItem } from '../../../../components/lists';
import { CustomTypography } from '../../../../components/typography';
import { T_FETCH_AWARDS } from '../../types';

interface Props {
  awards?: T_FETCH_AWARDS['awards'];
  loading: boolean;
  seasonId?: string;
}

export default function AwardList({ awards, loading, seasonId }: Props) {
  const list: IListItem[] = awards
    ? awards.map(award => {
        return {
          icon: <StatIcon icon={STAT_ICONS.MVP} />,
          label: (
            <CustomTypography bold size="xs" color="label">
              {award.awardName}
            </CustomTypography>
          ),
          secondary: (
            <>
              {award.winners?.map(winner => (
                <div key={typeof winner === 'object' ? winner._id : winner}>
                  <CustomTypography color="data" bold size="sm">
                    {typeof winner === 'object' ? winner.name : winner}
                  </CustomTypography>
                </div>
              ))}
              {award.comment ? (
                <CustomTypography size="sm" bold color="primary">
                  {award.comment}
                </CustomTypography>
              ) : null}
            </>
          ),
          value: (
            <CustomTypography color="data" size="sm" bold>
              {award.awardValue || ''}
            </CustomTypography>
          ),
          link: seasonId ? `season/${seasonId}/award/${award._id}` : `award/${award._id}`,
        };
      })
    : [];
  return <LinksList links={list} loading={loading} rows={5} />;
}
