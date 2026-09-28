import { useTranslation } from 'react-i18next';
import { CustomTypography, SectionContainer } from '../../../components';
import { TextList } from '../../../components/lists';
import BottomDrawer from '../../../components/modals/bottom-drawer/BottomDrawer';

interface Props {
  item: {
    points: number;
  };
  startingPoints: number;
  earnedPoints: number;
  totalPoints: number;
}

export default function PointsBreakdown({
  item,
  startingPoints,
  earnedPoints,
  totalPoints,
}: Props) {
  const { t } = useTranslation('tables');

  const startingPointsText = (
    <CustomTypography color="silver" bold>
      {startingPoints}
    </CustomTypography>
  );

  const earnedPointsText = (
    <CustomTypography color="data" bold>
      {earnedPoints}
    </CustomTypography>
  );

  const totalPointsText = (
    <CustomTypography color="primary" bold size="md">
      {totalPoints}
    </CustomTypography>
  );

  return (
    <BottomDrawer
      title={t('POINTS_BREAKDOWN.TITLE')}
      buttonElement={
        <CustomTypography size="xs" bold color="data">
          {item.points}
        </CustomTypography>
      }
    >
      <SectionContainer type="form">
        <TextList
          data={[
            {
              label: t('POINTS_BREAKDOWN.STARTING'),
              value: startingPointsText,
            },
            {
              label: t('POINTS_BREAKDOWN.EARNED'),
              value: earnedPointsText,
            },
            {
              label: t('POINTS_BREAKDOWN.TOTAL'),
              value: (
                <CustomTypography color="label">
                  {startingPointsText} + {earnedPointsText} = {totalPointsText}
                </CustomTypography>
              ),
            },
          ]}
        />
      </SectionContainer>
    </BottomDrawer>
  );
}
