import { IAward } from '../types';
import StatIcon from '../../../components/icons/StatIcon';
import { STAT_ICONS } from '../../../app/icons';
import { CustomTypography } from '../../../components/typography';
import { IListItem } from '../../../types';
import LinksList from '../../../components/lists/LinksList';

type Props = { awards: IAward[] };

const AwardList = ({ awards }: Props) => {
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
              {award.winners.map(winner => (
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
        };
      })
    : [];
  return <LinksList links={list} />;
};

export default AwardList;
