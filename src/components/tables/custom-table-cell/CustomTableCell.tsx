import { ImageAvatar } from '../../avatars';
import { AppIconType, FlagIcon } from '../../icons';
import { CustomSkeleton } from '../../loaders';
import { CustomTypography, DifferenceText, NumberText, PositionText } from '../../typography';
import { CellStyle, CellValue } from '../types';

interface Props {
  cellKey: string;
  cellValue: CellValue;
  cellType?: string;
  loading?: boolean;
  isStatic?: boolean;
  styles?: CellStyle;
}

export default function CustomTableCell({
  cellKey,
  cellValue,
  cellType,
  loading,
  isStatic,
  styles,
}: Props) {
  const renderWithSkeleton = (
    content: React.ReactNode,
    options?: {
      padding?: string;
      skeletonProps?: {
        variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
        width?: string;
        height?: string;
      };
    }
  ) => {
    const padding = options?.padding ?? '0px 6px';
    const skeletonProps = options?.skeletonProps || {};
    if (loading && !isStatic) {
      return (
        <div style={{ padding, boxSizing: 'border-box' }}>
          <CustomSkeleton
            width={skeletonProps.width ?? '100%'}
            height={skeletonProps.height}
            variant={skeletonProps.variant}
          />
        </div>
      );
    }
    return <div style={{ boxSizing: 'border-box' }}>{content}</div>;
  };

  if (typeof cellValue === 'object' && cellValue !== null && 'value' in cellValue) {
    if (cellType === 'image') {
      return renderWithSkeleton(
        <ImageAvatar
          size="28px"
          centered
          imageUrl={String(cellValue?.value)}
          alt={`${cellValue?.value} profile`}
          fallbackIcon={cellValue?.type as AppIconType}
        />,
        {
          padding: '4px 8px',
          skeletonProps: { variant: 'circular', width: '28px', height: '28px' },
        }
      );
    }

    if (cellType === 'link') {
      return renderWithSkeleton(
        <CustomTypography color={styles?.color || 'data'} size="sm" bold link={cellValue?.link}>
          {cellValue?.value}
        </CustomTypography>
      );
    }
  }
  if (cellType === 'position' || cellKey === 'position') {
    return renderWithSkeleton(<PositionText>{cellValue as string}</PositionText>);
  }

  if (cellType === 'difference') {
    return renderWithSkeleton(
      <DifferenceText stat={typeof cellValue === 'number' ? cellValue : 0} />
    );
  }

  if (cellType === 'percentage') {
    return renderWithSkeleton(
      <NumberText value={typeof cellValue === 'number' ? cellValue : 0} isPercentage />
    );
  }

  if (cellType === 'nationality') {
    return renderWithSkeleton(<FlagIcon nationality={cellValue as string} />);
  }

  return renderWithSkeleton(
    <CustomTypography size="xs" bold color={styles?.color || 'data'}>
      {cellValue as string}
    </CustomTypography>
  );
}
