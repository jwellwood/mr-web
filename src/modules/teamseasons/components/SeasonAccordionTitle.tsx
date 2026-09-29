import { CustomTypography } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { APP_ICONS, AppIcon } from '../../../components/icons';

interface Props {
  name: string;
  division?: string;
  position?: number;
  totalFinalPositions?: number;
}

export default function SeasonAccordionTitle({
  name,
  division,
  position,
  totalFinalPositions,
}: Props) {
  const winnerIcon = <AppIcon icon={APP_ICONS.TROPHY} color="gold" />;
  const runnerUpIcon = <AppIcon icon={APP_ICONS.MEDAL} color="silver" />;

  return (
    <CustomStack direction="row" divider justify="flex-start">
      <CustomTypography color="data" bold>
        {name}
      </CustomTypography>

      <CustomTypography color="label" size="sm">
        {division || '-'}
      </CustomTypography>
      {position === 1 && winnerIcon}
      {position === 2 && totalFinalPositions && totalFinalPositions > 2 && runnerUpIcon}
    </CustomStack>
  );
}
