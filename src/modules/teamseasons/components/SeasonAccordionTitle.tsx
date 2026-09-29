import { CustomTypography } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { APP_ICONS, AppIcon } from '../../../components/icons';
import { CustomSkeleton } from '../../../components/loaders';

interface Props {
  name: string;
  division?: string;
  position?: number;
  totalFinalPositions?: number;
  loading?: boolean;
}

export default function SeasonAccordionTitle({
  name,
  division,
  position,
  totalFinalPositions,
  loading,
}: Props) {
  const winnerIcon = <AppIcon icon={APP_ICONS.TROPHY} color="gold" />;
  const runnerUpIcon = <AppIcon icon={APP_ICONS.MEDAL} color="silver" />;

  return (
    <CustomStack direction="row" divider justify="flex-start">
      {loading ? (
        <CustomSkeleton width="40px" />
      ) : (
        <CustomTypography color="data" bold>
          {name}
        </CustomTypography>
      )}
      {loading ? (
        <CustomSkeleton width="100px" />
      ) : (
        <CustomTypography color="label" size="sm">
          {division || '-'}
        </CustomTypography>
      )}

      {position === 1 && !loading && winnerIcon}
      {position === 2 && totalFinalPositions && totalFinalPositions > 2 && !loading && runnerUpIcon}
    </CustomStack>
  );
}
