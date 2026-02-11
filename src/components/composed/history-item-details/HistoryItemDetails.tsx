import { Stack } from '@mui/material';
import { ReactElement } from 'react';
import { SectionContainer } from '../../containers';
import { AppIcon, AppIconType } from '../../icons';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';
import { CustomTypography } from '../../typography';

interface Props {
  icon: AppIconType;
  iconColor: string;
  header: string;
  subHeader: string;
  comment?: ReactElement | string;
  commentValue?: ReactElement | string | number;
  loading?: boolean;
}

export default function HistoryItemDetails({
  icon,
  iconColor,
  header,
  subHeader,
  commentValue,
  comment,
  loading,
}: Props) {
  const commentToDisplay = commentValue ? (
    <Stack spacing={1} alignItems="center">
      <CustomTypography color="data" bold>
        {commentValue}
      </CustomTypography>
      <div>{comment}</div>
    </Stack>
  ) : (
    comment
  );

  return (
    <SectionContainer type={!loading ? 'winner' : undefined}>
      <Stack spacing={2} alignItems="center">
        {loading ? (
          <CustomSkeleton width="50px" height="50px" />
        ) : (
          <AppIcon size="3rem" icon={icon} color={iconColor} />
        )}
        {loading ? (
          <CustomSkeleton width="150px" height="40px" />
        ) : (
          <CustomTypography color="data" size="lg" bold>
            {header}
          </CustomTypography>
        )}
        {loading ? (
          <CustomSkeleton width="100px" height="24px" />
        ) : (
          <CustomTypography color="data" size="md" bold>
            {subHeader}
          </CustomTypography>
        )}
        {loading ? (
          <CustomSkeleton width="240px" height="75px" />
        ) : (
          commentToDisplay && <CustomTypography color="label">{commentToDisplay}</CustomTypography>
        )}
      </Stack>
    </SectionContainer>
  );
}
