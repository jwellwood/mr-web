import { IListItem } from '../../../types/index.ts';
import { CustomTypography } from '../../../components/typography/index.ts';
import { parseDate } from '../../../utils/helpers/index.ts';
import { PresentationModal } from '../../../components/modals/index.ts';
import { CustomButton } from '../../../components/buttons/index.ts';
import LinksList from '../../../components/lists/LinksList.tsx';
import { Spinner } from '../../../components/loaders/index.ts';

interface Props {
  data: {
    teamGoals: number;
    opponentGoals: number;
    opponent: string;
    date: string;
    _id: string;
  }[];
  loading: boolean;
  orgId?: string;
  teamId?: string;
  title?: string;
}

export default function MostInMatchesModal({ data, loading, orgId, teamId, title }: Props) {
  const listData: IListItem[] =
    data?.map(item => {
      const labelColor =
        item.teamGoals > item.opponentGoals
          ? 'primary'
          : item.teamGoals === item.opponentGoals
            ? 'warning'
            : 'error';
      return {
        label: (
          <CustomTypography bold color="data">
            {item.opponent}
          </CustomTypography>
        ),
        secondary: (
          <CustomTypography color="label" size="xs">
            <CustomTypography color={labelColor} size="xs" bold>
              {item.teamGoals}-{item.opponentGoals}
            </CustomTypography>{' '}
            | {parseDate(item.date)}
          </CustomTypography>
        ),
        link: `/org/${orgId}/team/${teamId}/match/${item._id}`,
      };
    }) || [];

  return (
    <PresentationModal
      title={`Most ${title}`}
      buttonElement={
        <CustomButton variant="text">
          <CustomTypography bold color="primary" size="xs">
            Matches
          </CustomTypography>
        </CustomButton>
      }
    >
      {!loading ? <LinksList links={listData} /> : <Spinner />}
    </PresentationModal>
  );
}
