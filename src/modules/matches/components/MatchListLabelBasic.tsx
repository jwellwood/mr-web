import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { parseDate } from '../../../utils/helpers';

type Props = {
  opponent: string;
  date?: string;
  isHome?: boolean;
  loading?: boolean;
};

export default function MatchListLabelBasic({ opponent, date, isHome, loading }: Props) {
  return loading ? (
    <CustomSkeleton width="175px" height="42px" margin="0" />
  ) : (
    <>
      <div>
        <CustomTypography size="xs" bold color={isHome ? 'primary' : 'label'}>
          {isHome ? '(H)' : '(A)'}
          {'  '}
        </CustomTypography>
        <CustomTypography color="data" bold>
          {opponent}
        </CustomTypography>
      </div>

      <>
        <CustomTypography size="xs" color="label">
          {parseDate(date)}
        </CustomTypography>
      </>
    </>
  );
}
