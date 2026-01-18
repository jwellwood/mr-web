import { ApolloError } from '@apollo/client';

import {
  CustomTypography,
  DataError,
  LinksList,
  NoDataText,
  SectionContainer,
} from '../../../components';
import StatIcon from '../../../components/icons/StatIcon';
import { IAwardByPlayer } from '../../history/types';
import { IListItem } from '../../../components/lists/types';

type Props = {
  data?: { awards: IAwardByPlayer[] };
  loading: boolean;
  error?: ApolloError;
};

export default function PlayerAwardsView({ data, loading, error }: Props) {
  const awardsData: IListItem[] =
    data?.awards.map(award => {
      return {
        icon: <StatIcon icon="mvp" />,
        label: (
          <CustomTypography color="data" bold size="xs">
            {award.awardName}
          </CustomTypography>
        ),
        value: (
          <CustomTypography color="data" bold size="xs">
            {award.season}
          </CustomTypography>
        ),
      };
    }) || [];

  const renderContent = () =>
    data && data?.awards.length === 0 ? (
      <NoDataText>No awards yet</NoDataText>
    ) : (
      <SectionContainer isSpecial={!loading && !!data?.awards.length}>
        <LinksList links={awardsData} loading={loading} />
      </SectionContainer>
    );

  return (
    <SectionContainer title="Awards">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
