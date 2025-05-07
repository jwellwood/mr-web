import React from 'react';
import { CustomButton } from 'components/buttons';
import LinksList from 'components/lists/LinksList';
import { Spinner } from 'components/loaders';
import { PresentationModal } from 'components/modals';
import { CustomTypography } from 'components/typography';
import { IListItem } from 'types';
import { parseDate } from 'utils/helpers';

interface Props {
  data: any;
  loading: boolean;
  orgId: string;
  teamId: string;
  title: string;
}

const MostInMatchesModal: React.FC<Props> = ({
  data,
  loading,
  orgId,
  teamId,
  title,
}) => {
  const listData: IListItem[] =
    data?.map((item) => {
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
};

export default MostInMatchesModal;
