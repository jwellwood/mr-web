import StatIcon from '../../../../components/icons/StatIcon';
import { STAT_ICONS } from '../../../../components/icons/icons';
import { CustomTypography } from '../../../../components/typography';
import LinksList from '../../../../components/lists/links-list/LinksList';
import { IListItem } from '../../../../components/lists/types';
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
                <CustomTypography
                  key={typeof winner === 'object' ? winner._id : winner}
                  color="data"
                  bold
                  size="sm"
                  div
                >
                  {typeof winner === 'object' ? winner.name : winner}
                </CustomTypography>
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
