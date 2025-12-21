import { CustomAvatar } from '../../../components';
import LinksList from '../../../components/lists/links-list/LinksList';
import { IListItem } from '../../../components/lists/types';
import { CustomTypography } from '../../../components/typography';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { seasonColors } from '../constants';
import { ILeaguePositions } from '../types';
import ProgressBar from './ProgressBar';

type Props = {
  data?: ILeaguePositions[];
};

export default function SeasonsGraph({ data }: Props) {
  const { orgId, teamId } = useCustomParams();
  const getDivisions = () => {
    const divArray = (data || []).map(item => item.division).filter(Boolean);
    return [...new Set(divArray)];
  };
  const mapColorsToDivisions = (division?: string) => {
    if (!division) {
      return {
        color: seasonColors[seasonColors.length - 1].color,
        border: seasonColors[seasonColors.length - 1].border,
      };
    }
    const divisionIndex = getDivisions().indexOf(division);
    if (isNaN(divisionIndex)) {
      return {
        color: seasonColors[seasonColors.length - 1].color,
        border: seasonColors[seasonColors.length - 1].border,
      };
    }
    return {
      color: seasonColors[divisionIndex].color,
      border: seasonColors[divisionIndex].border,
    };
  };

  const getIconColor = (position: number) => {
    let color = 'secondary';
    switch (true) {
      case position === 1:
        color = 'gold';
        break;
      case position === 2:
        color = 'silver';
        break;
      case position === 3:
        color = 'bronze';
        break;
      default:
        break;
    }
    return color;
  };

  const mappedData: IListItem[] = (data || []).map(item => {
    const { division, position, name } = item;
    return {
      label: (
        <CustomTypography color="data" bold>
          {name}
        </CustomTypography>
      ),
      avatar: (
        <CustomAvatar
          border={getIconColor(position)}
          shadow={position < 4 ? getIconColor(position) : ''}
        >
          {position ? (
            <CustomTypography color="data" bold>
              {position}
              <CustomTypography color="label" size="xs">
                /{item.totalFinalPositions || 10}
              </CustomTypography>
            </CustomTypography>
          ) : (
            '?'
          )}
        </CustomAvatar>
      ),
      secondary: (
        <CustomTypography color={mapColorsToDivisions(division).color} size="xs">
          {division || '-'}
        </CustomTypography>
      ),
      value: position && <ProgressBar max={item.totalFinalPositions || 10} value={position} />,
      link: `/org/${orgId}/team/${teamId}/season/${item.seasonId}`,
    };
  });

  return <LinksList links={mappedData} />;
}
