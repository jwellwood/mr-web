import { ApolloError } from '@apollo/client';

import { IAward } from '../types';
import { CustomTypography, DataError, SectionContainer } from '../../../components';
import { IListItem } from '../../../components/lists/types';
import { Spinner } from '../../../components/loaders';
import TextList from '../../../components/lists/TextList';

type Props = {
  data?: { award: IAward };
  loading: boolean;
  error?: ApolloError;
};

export default function AwardView({ data, loading, error }: Props) {
  const listData: IListItem[] = data?.award
    ? [
        {
          label: (
            <CustomTypography color="primary" bold>
              {data.award?.winners
                ?.map(winner => (typeof winner === 'string' ? winner : winner.name))
                .join(', ')}
            </CustomTypography>
          ),
          value: data.award.awardValue || '-',
        },
      ]
    : [];

  const renderContent = () =>
    loading ? (
      <Spinner />
    ) : (
      <SectionContainer title={data?.award?.awardName || 'Details'}>
        <TextList data={listData} />
        <CustomTypography color="data">{data?.award?.comment || ''}</CustomTypography>
      </SectionContainer>
    );

  return error ? <DataError error={error} /> : renderContent();
}
