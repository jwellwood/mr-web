import { CustomStack } from '../../grids';
import { type IListItem } from '../../lists';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';
import { CustomTypography } from '../../typography';

interface Props {
  data: IListItem[];
  loading?: boolean;
}

export default function DataContainer({ data, loading }: Props) {
  return (
    <CustomStack direction="row" spacing={1} divider align="center" justify="space-around">
      {data.map((item, i) => (
        <CustomStack key={String(item.value) + i} direction="column" spacing={1} align="center">
          {item.icon && <div>{item.icon}</div>}
          <CustomTypography bold color="data" size="md">
            {loading ? <CustomSkeleton height="20px" width="50px" /> : item.value}
          </CustomTypography>
          <CustomTypography size="xs" color="label">
            {item.label}
          </CustomTypography>
        </CustomStack>
      ))}
    </CustomStack>
  );
}
